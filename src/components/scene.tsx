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
import { CylinderState, SceneState } from "./scene_state";
import { useRobotContext } from "../hooks/use-robot-context";
import { CircleOutline, Sector } from "./circle";

interface SceneProps {
  goal: CylinderState;
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
export const Scene = ({
  goal,
  state,
  cameraPosition,
  controlsEnabled = true
}: SceneProps) => {
  const leftArm = useRobotContext();
  const rightArm = useRobotContext();
  useEffect(() => {
    leftArm.setJointValue("iiwa_joint1", state.leftArm.joint1);
    leftArm.setJointValue("iiwa_joint2", state.leftArm.joint2);
    leftArm.setJointValue("iiwa_joint3", state.leftArm.joint3);
    leftArm.setJointValue("iiwa_joint4", state.leftArm.joint4);
    leftArm.setJointValue("iiwa_joint5", state.leftArm.joint5);
    leftArm.setJointValue("iiwa_joint6", state.leftArm.joint6);
    leftArm.setJointValue("iiwa_joint7", state.leftArm.joint7);
    rightArm.setJointValue("iiwa_joint1", state.rightArm.joint1);
    rightArm.setJointValue("iiwa_joint2", state.rightArm.joint2);
    rightArm.setJointValue("iiwa_joint3", state.rightArm.joint3);
    rightArm.setJointValue("iiwa_joint4", state.rightArm.joint4);
    rightArm.setJointValue("iiwa_joint5", state.rightArm.joint5);
    rightArm.setJointValue("iiwa_joint6", state.rightArm.joint6);
    rightArm.setJointValue("iiwa_joint7", state.rightArm.joint7);
  }, [state, leftArm, rightArm]);

  let startAngle = 0;
  let endAngle = 0;
  if (state.cylinder.rotation - goal.rotation > 0) {
    startAngle = 0;
    endAngle = state.cylinder.rotation - goal.rotation;
  } else {
    startAngle = state.cylinder.rotation - goal.rotation;
    endAngle = 0;
  }

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

            {/* The moving cylinder. */}
            <group
              position={[state.cylinder.x, state.cylinder.y, 0.25]}
              rotation-z={state.cylinder.rotation}
            >
              <Cylinder radius={0.14} height={0.5} color={"#ff8888"} opacity={0.75} />
              <Frame size={0.4} />
            </group>

            {/* The goal. */}
            <group position={[goal.x, goal.y, 0]} rotation-z={goal.rotation}>
              <CircleOutline radius={0.14} />
              <Sector
                color={"#FFFFFF"}
                radius={0.14}
                startAngle={startAngle}
                endAngle={endAngle}
              />
              {/* <Frame size={0.4} displayY={false} displayZ={false} /> */}
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
