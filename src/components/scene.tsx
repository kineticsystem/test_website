import { useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";

import Grid from "./grid";
import { Frame } from "./frame";
import { Robot } from "./robot";
import { Cylinder } from "./cylinder";
import { SceneState } from "./scene_state";
import { useRobotContext } from "../hooks/use-robot-context";

interface SceneProps {
  state: SceneState;
  cameraPosition: [number, number, number];
  controlsEnabled?: boolean;
}

/**
 * Component to display the scene with two arms and a cylinder.
 *
 * ThreeJS default coordinate frame is y-up. There is a method to change the
 * reference frame to z-up:
 * THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
 *
 * Unfortunately, the GizmoHelper only works with the default y-up frame.
 * For this reason, we decided to apply some rotations to the whole scene to
 * make it z-up and change labels and colors in the GizmoHelper, instead.
 */
export const Scene = ({ state, cameraPosition, controlsEnabled = true }: SceneProps) => {
  const leftArm = useRobotContext();
  const rightArm = useRobotContext();
  useEffect(() => {
    leftArm.setJointValue("iiwa_joint_1", state.leftArm.joint_1);
    leftArm.setJointValue("iiwa_joint_2", state.leftArm.joint_2);
    leftArm.setJointValue("iiwa_joint_3", state.leftArm.joint_3);
    leftArm.setJointValue("iiwa_joint_4", state.leftArm.joint_4);
    leftArm.setJointValue("iiwa_joint_5", state.leftArm.joint_5);
    leftArm.setJointValue("iiwa_joint_6", state.leftArm.joint_6);
    leftArm.setJointValue("iiwa_joint_7", state.leftArm.joint_7);
    rightArm.setJointValue("iiwa_joint_1", state.rightArm.joint_1);
    rightArm.setJointValue("iiwa_joint_2", state.rightArm.joint_2);
    rightArm.setJointValue("iiwa_joint_3", state.rightArm.joint_3);
    rightArm.setJointValue("iiwa_joint_4", state.rightArm.joint_4);
    rightArm.setJointValue("iiwa_joint_5", state.rightArm.joint_5);
    rightArm.setJointValue("iiwa_joint_6", state.rightArm.joint_6);
    rightArm.setJointValue("iiwa_joint_7", state.rightArm.joint_7);
  }, [state, leftArm, rightArm]);

  return (
    <div className="w-full">
      <div className="aspect-square bg-gray-200 rounded-md overflow-hidden shadow-md">
        <Canvas
          // only re-render when props changed or when requested.
          // frameloop="demand"
          style={{
            backgroundColor: "#192635",
            borderRadius: "inherit",
            margin: "0 auto" // Center horizontally.
          }}
        >
          <AdaptiveDpr />
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[0, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />

          {/* We rotate the whole scene to make it z-up. */}
          <group
            rotation-x={-Math.PI / 2}
            rotation-z={-Math.PI / 2}
            position={[0, -0.2, -0.35]}
          >
            <Robot robot={leftArm} position={[0, 0.45, 0]} />
            <Robot robot={rightArm} position={[0, -0.45, 0]} />
            <group
              position={[state.cylinder.x, state.cylinder.y, 0.25]}
              rotation-z={state.cylinder.rotation}
            >
              <Cylinder radius={0.14} height={0.5} color={"#ff8888"} opacity={0.75} />
              <Frame size={0.6} />
            </group>
            <Grid />
          </group>

          <PerspectiveCamera
            makeDefault
            position={[cameraPosition[1], cameraPosition[2], cameraPosition[0]]}
            fov={20}
          />
          <OrbitControls makeDefault enableRotate={controlsEnabled} />

          {/* We invert colors and labels to make it look like z-up. */}

          <group scale={[-1, -1, 1]}>
            <GizmoHelper alignment="top-left" margin={[80, 80]}>
              <GizmoViewport
                axisColors={["#2f7f4f", "#3b5b9d", "#9d4b4b"]}
                labels={["Y", "Z", "X"]}
                labelColor="white"
                disabled={!controlsEnabled}
              />
            </GizmoHelper>
          </group>
        </Canvas>
      </div>
    </div>
  );
};
