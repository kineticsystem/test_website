import { useMemo } from "react";

import * as THREE from "three";
/**
 * Component to draw a circle.
 */
export const Circle = ({ position = [0, 0], radius = 1, color = "blue", ...props }) => {
  return (
    <mesh position={[position[0], position[1], 0]} {...props}>
      <circleGeometry args={[radius, 64]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

/**
 * Component to draw a circle outline.
 */
export const CircleOutline = ({
  position = [0, 0, 0],
  radius = 1,
  tube = 0.004,
  radialSegments = 4,
  tubularSegments = 64,
  arc = Math.PI * 2,
  color = "white",
  ...props
}) => {
  return (
    <mesh position={[position[0], position[1], position[2]]} {...props}>
      <torusGeometry args={[radius, tube, radialSegments, tubularSegments, arc]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/**
 * Component to draw a sector.
 */
export const Sector = ({
  position = [0, 0, 0],
  radius = 1,
  startAngle = 0, // In radians
  endAngle = Math.PI / 2, // In radians
  color = "red",
  ...props
}) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);
    return shape;
  }, [radius, startAngle, endAngle]);

  return (
    <mesh position={[position[0], position[1], position[2]]} {...props}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
