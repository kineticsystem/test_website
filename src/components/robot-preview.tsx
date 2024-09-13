import { useEffect, useRef } from "react";

import { PerspectiveCamera as PerspectiveCameraImpl } from "three";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, GizmoHelper, GizmoViewport } from "@react-three/drei";

import Grid from "./grid";
import { CameraControls } from "./camera-controls";
import { CameraProvider } from "../context/camera-context";
import { useRobotContext } from "../hooks/use-robot-context";

export const RobotPreview = () => {
  const robot = useRobotContext();
  const cameraRef = useRef<PerspectiveCameraImpl>(null);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(-2, 2, 0); // Set initial camera position
    }
  }, []);

  return (
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
      <CameraProvider>
        <CameraControls />
      </CameraProvider>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {/* Floor grid */}
      <Grid />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
          labelColor="white"
        />
      </GizmoHelper>
      {/* Render the URDF model */}
      <primitive object={robot} />
    </Canvas>
  );
};
