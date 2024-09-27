import { Suspense, useCallback, useMemo, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Player } from "./../../components/player";
import { ScatterPlot } from "./../../components/scatter-plot";
import { IiwaScene } from "./../../components/iiwa/iiwa_scene";
import { RobotContextProvider } from "./../../context/robot-context";
import { CylinderState, SceneEpisode, SceneState } from "./iiwa_scene_state";

export const IiwaComponent = () => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  const urdf = `${window.location.origin}/test_website/models/iiwa/urdf/iiwa7.urdf`;

  const [goal, setGoal] = useState<CylinderState>({
    x: 0.6718483143235885,
    y: -0.23452121868326742,
    rotation: 0.5336689388195219
  });

  const [sceneState, setSceneState] = useState<SceneState>({
    timeFromStart: 0,
    leftArm: {
      joint0: 0.014487597656250184,
      joint1: 1.5707,
      joint2: -1.5707,
      joint3: 0.9621149999999998,
      joint4: 0,
      joint5: 1.8224313687622034,
      joint6: 0
    },
    rightArm: {
      joint0: 0.8866409765625005,
      joint1: 1.5707,
      joint2: -1.5707,
      joint3: 1.48407875,
      joint4: 0,
      joint5: 1.4970950337700102,
      joint6: 0
    },
    cylinder: {
      x: 0.6184808436607272,
      y: -0.09208531449445188,
      rotation: 0
    }
  });

  // State to hold the sequence of SceneStates.
  const [sceneSequence, setSceneSequence] = useState<SceneState[]>([sceneState]);

  // Load
  const iiwaTrajectoryFiles: string[] = useMemo(
    () =>
      Array.from(
        { length: 10 },
        (_, index) =>
          `${window.location.origin}/test_website/data/iiwa/trajectory_${index}.json`
      ),
    []
  );

  const onStateChanged = useCallback((state: SceneState) => {
    setSceneState(state);
  }, []);

  const handleSelectedPoint = useCallback(
    async (index: number) => {
      try {
        const url = iiwaTrajectoryFiles[index];
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
    [iiwaTrajectoryFiles]
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
                    <IiwaScene
                      goal={goal}
                      state={sceneState}
                      cameraPosition={[2.5, 2.5, 2.5]}
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
