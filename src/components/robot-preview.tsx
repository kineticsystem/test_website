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
    <group rotation-x={Math.PI / 2}>
      <mesh ref={myref}>
        <cylinderGeometry attach="geometry" args={[0.14, 0.14, 0.5]} />
        <meshBasicMaterial attach="material" color={[0.9, 0.9, 0.9]} />
      </mesh>
    </group>
  );
}

export const RobotPreview = () => {
  const leftArm = useRobotContext();
  const rightArm = useRobotContext();
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
      <AdaptiveDpr />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />

      {/* We rotate all element of the scene to make it appear like if the reference frame is z-up. */}
      <group rotation-x={-Math.PI / 2}>
        <primitive position={[0.45, 0, 0]} object={leftArm} />
        <primitive position={[-0.45, 0, 0]} object={rightArm} />

        <Cylinder />
        <Grid />
      </group>

      <PerspectiveCamera makeDefault position={[2.5, 2.5, 2.5]} fov={20} />
      <OrbitControls makeDefault />

      {/* We invert colors and labels to make it appear like if the reference frame is z-up. */}
      <GizmoHelper alignment="top-left" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#2f7f4f", "#3b5b9d", "#9d4b4b"]}
          labels={["Y", "Z", "X"]}
          labelColor="white"
        />
      </GizmoHelper>
    </Canvas>
  );
};
