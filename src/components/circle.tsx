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
  tube = 0.005,
  radialSegments = 16,
  tubularSegments = 100,
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
