import { useRef, useState } from "react";

import "academicons/css/academicons.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  OrbitControls,
  PerspectiveCamera,
  GizmoHelper,
  GizmoViewport
} from "@react-three/drei";
import "./App.css";
import "./index.css";
import * as THREE from "three";
import GridHelper from "./components/grid-helper";

type BoxProps = JSX.IntrinsicElements["mesh"];

const Box: React.FC<BoxProps> = (props) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((_, delta) => (meshRef.current!.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h1 className="title is-1 publication-title">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>

      <Canvas
        // only re-render when props changed or when requested.
        // frameloop="demand"
        style={{
          backgroundColor: "#192635",
          borderRadius: "inherit",
          width: "100vw", // Full width of the viewport
          height: "50vh" // Full height of the viewport
        }}
      >
        <AdaptiveDpr />
        <PerspectiveCamera fov={45} />
        <OrbitControls makeDefault />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        {/* Floor grid */}
        <GridHelper />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
      </Canvas>

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
