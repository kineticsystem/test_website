import { useEffect, useRef } from "react";

import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from "three";

import { Canvas, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";

import GridHelper from "./grid-helper";
import { useRobotContext } from "../hooks/use-robot-context";
import { useCameraContext } from "../hooks/use-camera-context";
import { CameraProvider } from "../context/camera-context";

const position = new Vector3(1, 2.5, 2.5);

/**
 * This component is a controller to change the canvas default camera position,
 * target and field of view.
 */
export const CameraControls = () => {
  const { camera, gl } = useThree();
  const orbitRef = useRef<OrbitControlsImpl>(null);
  const cameraRef = useRef<PerspectiveCameraImpl>(null);
  const { cameraState, setTarget } = useCameraContext();

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        key={cameraState.key}
        makeDefault
        position={position}
        fov={45}
      />
      <OrbitControls
        makeDefault
        ref={orbitRef}
        enabled={cameraState.controlsEnabled}
        dampingFactor={1}
        args={[camera, gl.domElement]}
        target={cameraState.target}
        onChange={() => {
          if (orbitRef.current && cameraRef.current) {
            setTarget(
              orbitRef.current.target,
              !position.equals(cameraRef.current.position)
            );
          }
        }}
        position={position}
      />
    </>
  );
};

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
      <GridHelper />
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
