import { useMemo } from "react";
import * as THREE from "three";
import { TorusGeometry } from "three";

export const Circle = ({ position = [0, 0], radius = 1, color = "blue", ...props }) => {
  return (
    <mesh position={[position[0], position[1], 0]} {...props}>
      {/* CircleGeometry takes radius and segments as arguments */}
      <circleGeometry args={[radius, 64]} />
      {/* You can choose different materials; MeshStandardMaterial is commonly used */}
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

export const CircleOutline = ({
  position = [0, 0, 0],
  radius = 1, // Major radius (distance from center to tube center)
  tube = 0.005, // Minor radius (thickness of the circle)
  radialSegments = 16,
  tubularSegments = 100,
  arc = Math.PI * 2,
  color = "white",
  ...props
}) => {
  // Memoize geometry to prevent unnecessary recalculations
  const geometry = useMemo(() => {
    return new TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
  }, [radius, tube, radialSegments, tubularSegments, arc]);

  return (
    <mesh
      position={[position[0], position[1], position[2]]}
      geometry={geometry}
      {...props}
    >
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
