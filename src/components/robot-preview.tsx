import { Canvas, RootState, useFrame } from "@react-three/fiber";
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
import { URDFRobot } from "urdf-loader";
import { Frame } from "./frame";
import { Cylinder } from "./cylinder";

interface RobotProps {
  robot: URDFRobot;
  position: [number, number, number];
}

const Robot1 = ({ robot, position }: RobotProps) => {
  const angleRef = useRef<number>(0);

  useFrame((state: RootState, delta: number) => {
    angleRef.current += delta;
    if (robot && robot.joints) {
      const minAngle = -Math.PI / 4; // Minimum angle in radians
      const maxAngle = Math.PI / 4; // Maximum angle in radians
      const frequency = 0.5; // Oscillations per second
      const t = state.clock.elapsedTime;

      // Calculate amplitude and offset for the sine wave
      const amplitude = (maxAngle - minAngle) / 2;
      const offset = (maxAngle + minAngle) / 2;

      // Compute the angle using the sine function
      const angle = amplitude * Math.sin(2 * Math.PI * frequency * t) + offset;

      robot.setJointValue("iiwa_joint_1", angle);
      robot.setJointValue("iiwa_joint_2", angle);
      robot.setJointValue("iiwa_joint_3", angle);
      robot.setJointValue("iiwa_joint_4", angle);
      robot.setJointValue("iiwa_joint_5", angle);
      robot.setJointValue("iiwa_joint_6", angle);
      robot.setJointValue("iiwa_joint_7", angle);
    }
  });

  return <primitive position={position} object={robot} />;
};

const Robot2 = ({ robot, position }: RobotProps) => {
  const angleRef = useRef<number>(0);

  useFrame((state: RootState, delta: number) => {
    angleRef.current += delta;
    if (robot && robot.joints) {
      const minAngle = -Math.PI / 4; // Minimum angle in radians
      const maxAngle = Math.PI / 4; // Maximum angle in radians
      const frequency = 0.5; // Oscillations per second
      const t = state.clock.elapsedTime;

      // Calculate amplitude and offset for the sine wave
      const amplitude = (maxAngle - minAngle) / 2;
      const offset = (maxAngle + minAngle) / 2;

      // Compute the angle using the sine function
      const angle = amplitude * Math.sin(2 * Math.PI * frequency * t) + offset;

      robot.setJointValue("iiwa_joint_1", -angle);
      robot.setJointValue("iiwa_joint_2", -angle);
      robot.setJointValue("iiwa_joint_3", -angle);
      robot.setJointValue("iiwa_joint_4", -angle);
      robot.setJointValue("iiwa_joint_5", -angle);
      robot.setJointValue("iiwa_joint_6", -angle);
      robot.setJointValue("iiwa_joint_7", -angle);
    }
  });

  return <primitive position={position} object={robot} />;
};

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
      <AdaptiveDpr />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[0, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />

      {/* We rotate all element of the scene to make it appear like if the reference frame is z-up. */}
      <group rotation-x={-Math.PI / 2}>
        <Robot1 robot={robot1} position={[0.45, 0, 0]} />
        <Robot2 robot={robot2} position={[-0.45, 0, 0]} />

        <Cylinder radius={0.14} height={0.5} color={"#ff8888"} opacity={0.75} />
        <Frame size={0.75} />

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
