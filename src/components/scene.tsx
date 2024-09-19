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
}

/**
 * Component to display the scene with two arms and a cylinder.
 */
export const Scene = ({ state }: SceneProps) => {
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
    <Canvas
      // only re-render when props changed or when requested.
      // frameloop="demand"
      style={{
        backgroundColor: "#192635",
        borderRadius: "inherit",
        width: "50vw", // Full width of the viewport
        height: "50vh", // Full height of the viewport
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

      {/* We rotate the scene to make it appear like if the reference frame is z-up. */}
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

      <PerspectiveCamera makeDefault position={[2.5, 2.5, 2.5]} fov={20} />
      <OrbitControls makeDefault />

      {/* We invert colors and labels to make it appear like if the reference frame is z-up. */}
      <group scale={[-1, -1, 1]}>
        <GizmoHelper alignment="top-left" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#2f7f4f", "#3b5b9d", "#9d4b4b"]}
            labels={["Y", "Z", "X"]}
            labelColor="white"
          />
        </GizmoHelper>
      </group>
    </Canvas>
  );
};
