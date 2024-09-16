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
        <primitive position={[0.5, 0, 0]} object={robot1} />
        <primitive position={[-0.5, 0, 0]} object={robot2} />

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

        {/* Floor grid */}
        <Grid />
      </group>
    </Canvas>
  );
};
