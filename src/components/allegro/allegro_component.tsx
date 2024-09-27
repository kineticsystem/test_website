import { Suspense, useCallback, useMemo, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Player } from "../player";
import { ScatterPlot } from "../scatter-plot";
import { Scene } from "../allegro/allegro_scene";
import { RobotContextProvider } from "../../context/robot-context";
import { CubeState, SceneEpisode, SceneState } from "./allegro_scene_state";

export const AllegroComponent = () => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  const urdf = `${window.location.origin}/test_website/models/allegro/urdf/allegro_right_hand.urdf`;

  const [goal, setGoal] = useState<CubeState>({
    position: {
      x: 0.065,
      y: 0.0,
      z: 0.05869370640654911
    },
    rotation: {
      w: 0.9508815466352549,
      x: -0.15033622173376135,
      y: 0.22499405578410397,
      z: -0.15033622173376135
    }
  });

  const [sceneState, setSceneState] = useState<SceneState>({
    timeFromStart: 0,
    hand: {
      joint0: 0.01,
      joint1: 1.24,
      joint2: 1.31,
      joint3: 1.13,
      joint4: -0.01,
      joint5: 0.77,
      joint6: 1.31,
      joint7: 1.39,
      joint8: 0.0,
      joint9: 1.24,
      joint10: 1.31,
      joint11: 1.13,
      joint12: 0.49,
      joint13: 1.58,
      joint14: 1.4,
      joint15: 1.36
    },
    cube: {
      position: {
        x: 0.065,
        y: 0.0,
        z: 0.042
      },
      rotation: {
        w: 1.0,
        x: 0.0,
        y: 0.0,
        z: 0.0
      }
    }
  });

  // State to hold the sequence of SceneStates.
  const [sceneSequence, setSceneSequence] = useState<SceneState[]>([sceneState]);

  // Load
  const trajectoryFiles: string[] = useMemo(
    () =>
      Array.from(
        { length: 1 },
        (_, index) =>
          `${window.location.origin}/test_website/data/allegro/trajectory_${index}.json`
      ),
    []
  );

  const onStateChanged = useCallback((state: SceneState) => {
    setSceneState(state);
  }, []);

  const handleSelectedPoint = useCallback(
    async (index: number) => {
      try {
        const url = trajectoryFiles[index];
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${url}: ${response.status} ${response.statusText}`
          );
        }
        const data: SceneEpisode = await response.json();
        setGoal(data.goal);
        setSceneSequence(data.points);
      } catch (error) {
        throw new Error(`Error loading trajectory: ${(error as Error).message}`);
      }
    },
    [trajectoryFiles]
  );

  return (
    <>
      <div className="container mx-auto px-2 py-2 max-w-3xl">
        {/* Center the column. */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center">
          {/* Scatter Plot. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <ScatterPlot onPointSelected={handleSelectedPoint} />
          </div>

          {/* Scene. */}
          <div className="w-full md:w-1/2 px-1 mb-1">
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <Suspense fallback={<div>Loading robot...</div>}>
                  <RobotContextProvider url={urdf}>
                    <Scene
                      goal={goal}
                      state={sceneState}
                      cameraPosition={[0.5, 0.5, 0.5]}
                    />
                  </RobotContextProvider>
                </Suspense>
              </ErrorBoundary>
            </QueryClientProvider>
          </div>
        </div>
      </div>

      <div>
        <Player sequence={sceneSequence} onFrameChanged={onStateChanged} />
      </div>
    </>
  );
};
