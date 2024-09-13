import { useRef } from "react";

import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from "three";

import { useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { useCameraContext } from "../hooks/use-camera-context";

const initialPosition = new Vector3(1, 2.5, 2.5);

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
        position={initialPosition}
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
              !initialPosition.equals(cameraRef.current.position)
            );
          }
        }}
        position={initialPosition}
      />
    </>
  );
};
