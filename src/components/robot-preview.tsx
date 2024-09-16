import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";

import Grid from "./grid";
import { useRobotContext } from "../hooks/use-robot-context";
import { useRef } from "react";
import { Mesh } from "three";

function Cylinder() {
  const myref = useRef<Mesh>(null);

  return (
    <mesh ref={myref}>
      <cylinderGeometry attach="geometry" args={[0.14, 0.14, 0.5]} />
      <meshBasicMaterial attach="material" color={[0.9, 0.9, 0.9]} />
    </mesh>
  );
}

export const RobotPreview = () => {
  const robot1 = useRobotContext();
  const robot2 = useRobotContext();
  return (
    <Canvas
      // only re-render when props changed or when requested.
      // frameloop="demand"
      style={{
        backgroundColor: "#192635",
        borderRadius: "inherit",
        width: "100vw", // Full width of the viewport
        height: "50vh", // Full height of the viewport
        margin: "0 auto" // Center horizontally.
      }}
    >
      <group rotation-x={0}>
        <AdaptiveDpr />

        {/* Render the URDF model */}
        <primitive
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0.45, 0, 0]}
          object={robot1}
        />
        <primitive
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-0.45, 0, 0]}
          object={robot2}
        />

        <GizmoHelper alignment="top-left" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>

        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />

        <PerspectiveCamera makeDefault position={[2.5, 2.5, 2.5]} fov={20} />
        <OrbitControls makeDefault />

        <Cylinder />

        {/* Floor grid */}
        <Grid />
      </group>
    </Canvas>
  );
};
