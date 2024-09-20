import { Suspense, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Scene } from "./components/scene";
import { SceneState, SceneStateSequence } from "./components/scene_state";
import { RobotContextProvider } from "./context/robot-context";
import { Player } from "./components/player";

import "academicons/css/academicons.min.css";

import "./App.css";
import "./index.css";

const App = () => {
  const urdfUrl = `${window.location.origin}/test_website/drake_models/iiwa_description/urdf/iiwa7.urdf`;

  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  const [sceneState, setSceneState] = useState<SceneState>({
    timeFromStart: 0,
    leftArm: {
      joint1: 0.014487597656250184,
      joint2: 1.5707,
      joint3: -1.5707,
      joint4: 0.9621149999999998,
      joint5: 0,
      joint6: 1.8224313687622034,
      joint7: 0
    },
    rightArm: {
      joint1: 0.8866409765625005,
      joint2: 1.5707,
      joint3: -1.5707,
      joint4: 1.48407875,
      joint5: 0,
      joint6: 1.4970950337700102,
      joint7: 0
    },
    cylinder: {
      x: 0.6184808436607272,
      y: -0.09208531449445188,
      rotation: 0
    }
  });

  // State to hold the sequence of SceneStates.
  const [sceneSequence, setSceneSequence] = useState<SceneState[]>([]);

  const onStateChanged = (state: SceneState) => {
    setSceneState(state);
  };

  // Load
  const trajectoryFiles: string[] = [];
  for (let i = 0; i < 10; i++) {
    const trajectoryFile = `${window.location.origin}/test_website/data/trajectory_${i}.json`;
    trajectoryFiles.push(trajectoryFile);
  }

  const buttons = Array.from({ length: 10 }, (_, index) => `Trajectory ${index + 1}`);

  const handleButtonClick = async (index: number) => {
    try {
      const url = trajectoryFiles[index];
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${response.status} ${response.statusText}`
        );
      }
      const sequence: SceneStateSequence = await response.json();
      setSceneSequence(sequence.points);
    } catch (error) {
      throw new Error(`Error loading trajectory: ${(error as Error).message}`);
    }
  };

  return (
    <>
      <div className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                {/* Title. */}
                <h1 className="title is-1 publication-title">
                  Geodroix: Auto classification with Machine Learning
                </h1>

                {/* Authors. */}
                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    Eliza M. Thornton
                    <sup>1,2</sup>,&nbsp;
                  </span>
                  <span className="author-block">
                    <a href="#" target="_blank">
                      Jonathan R. Wexler
                      <sup>1</sup>,&nbsp;
                    </a>
                  </span>
                  <span className="author-block">
                    Sophia Lanford
                    <sup>1</sup>,&nbsp;
                  </span>
                  <span className="author-block">
                    Marina Fenwick
                    <sup>1</sup>,&nbsp;
                  </span>
                  <span className="author-block">
                    Felix P. Nightingale
                    <sup>1</sup>
                  </span>
                </div>

                {/* Publication links. */}
                <div className="publication-links">
                  {/* arxiv Link. */}
                  <span className="link-block">
                    <a
                      href="https://arxiv.org/abs/2407.20179"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <i className="ai ai-arxiv"></i>
                      </span>
                      <span>arXiv</span>
                    </a>
                  </span>

                  {/* Code Link. */}
                  <span className="link-block">
                    <a
                      href="https://github.com/bdaiinstitute/#"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                      <span>Code</span>
                    </a>
                  </span>

                  {/* Datasets. */}
                  <span className="link-block">
                    <a
                      href="https://github.com/bdaiinstitute/#"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                      <span>Datasets</span>
                    </a>
                  </span>
                </div>

                {/* Buttons Container */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 w-full mt-4">
                  {buttons.map((label, index) => (
                    <button
                      key={index}
                      className="button w-full"
                      onClick={() => {
                        handleButtonClick(index);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div>
                  <Player sequence={sceneSequence} onFrameChanged={onStateChanged} />
                </div>

                <div className="container mx-auto px-2 py-2 max-w-3xl">
                  <QueryClientProvider client={queryClient}>
                    <ErrorBoundary fallback={<div>Something went wrong</div>}>
                      <Suspense fallback={<div>Loading robot...</div>}>
                        <RobotContextProvider url={urdfUrl}>
                          {/* Added justify-center to center the column */}
                          <div className="flex flex-col md:flex-row flex-wrap justify-center">
                            <div key="1" className="w-full md:w-1/2 px-0 mb-0">
                              <div className="bg-white-500 text-white p-1 rounded-lg">
                                <Scene
                                  state={sceneState}
                                  cameraPosition={[2.5, 2.5, 2.5]}
                                />
                              </div>
                            </div>
                            {/* If you have more columns and want only one centered, ensure other columns have appropriate widths or use auto margins */}
                          </div>
                        </RobotContextProvider>
                      </Suspense>
                    </ErrorBoundary>
                  </QueryClientProvider>
                </div>

                {/* column has-text-centered */}
              </div>
              {/* columns is-centered */}
            </div>
            {/* container is-max-desktop */}
          </div>
          {/* hero-body */}
        </div>
        {/* hero */}
      </div>
    </>
  );
};

export default App;
