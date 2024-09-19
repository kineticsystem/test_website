import { Suspense, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Scene } from "./components/scene";
import { SceneState } from "./components/scene_state";
import { RobotContextProvider } from "./context/robot-context";
import { SceneController } from "./components/robot_controller";

import "academicons/css/academicons.min.css";

import "./App.css";
import "./index.css";

const App = () => {
  const urdfUrl = `${window.location.origin}/test_website/drake_models/iiwa_description/urdf/iiwa7.urdf`;

  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  const [sceneState, setSceneState] = useState<SceneState>({
    leftArm: {
      joint_1: 0.014487597656250184,
      joint_2: 1.5707,
      joint_3: -1.5707,
      joint_4: 0.9621149999999998,
      joint_5: 0,
      joint_6: 1.8224313687622034,
      joint_7: 0
    },
    rightArm: {
      joint_1: 0.8866409765625005,
      joint_2: 1.5707,
      joint_3: -1.5707,
      joint_4: 1.48407875,
      joint_5: 0,
      joint_6: 1.4970950337700102,
      joint_7: 0
    },
    cylinder: {
      x: 0.6184808436607272,
      y: -0.09208531449445188,
      rotation: 0
    }
  });

  const onStateChanged = (state: SceneState) => {
    setSceneState(state);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Geodroix: Auto classification with Machine Learning
      </h1>

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

      <div className="column has-text-centered">
        <div className="publication-links"></div>
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

      <div className="container mx-auto px-2 py-2 max-w-3xl">
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>Loading robot...</div>}>
              <RobotContextProvider url={urdfUrl}>
                <div className="flex flex-col md:flex-row flex-wrap">
                  <div key="1" className="w-full md:w-1/2 px-0 mb-0">
                    <div className="bg-white-500 text-white p-1 rounded-lg">
                      <Scene state={sceneState} cameraPosition={[2.5, 2.5, 2.5]} />
                    </div>
                  </div>
                  <div key="2" className="w-full md:w-1/2">
                    <div className="bg-white-500 text-white p-1 rounded-lg">
                      <Scene
                        state={sceneState}
                        cameraPosition={[0, 0, 4]}
                        controlsEnabled={false}
                      />
                    </div>
                  </div>
                  <div key="3" className="w-full md:w-1/2">
                    <div className="bg-white-500 text-white p-1 rounded-lg">
                      <Scene
                        state={sceneState}
                        cameraPosition={[0, 4, 0]}
                        controlsEnabled={false}
                      />
                    </div>
                  </div>
                  <div key="4" className="w-full md:w-1/2">
                    <div className="bg-white-500 text-white p-1 rounded-lg">
                      <Scene
                        state={sceneState}
                        cameraPosition={[4, 0, 0]}
                        controlsEnabled={false}
                      />
                    </div>
                  </div>
                </div>
              </RobotContextProvider>
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>
      </div>

      <div>
        <SceneController onStateChanged={onStateChanged} />
      </div>

      <div className="hero teaser">
        <div className="container is-max-desktop">
          <div className="hero-body">
            <h2 className="subtitle has-text-centered">
              <b>This project</b> is about bla and bla.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
