/**
 * Props for the CircleOutline component.
 * @property radius The outline radius.
 * @property color The outline color.
 */
export interface CircleOutlineProps {
  radius: number;
  color: string;
}

/**
 * Component to display an circle outlline.
 * @param props {@link CircleOutlineProps}
 * @returns A circle outline.
 */
export const CircleOutline = ({ radius = 1, color = "white" }: CircleOutlineProps) => {
  const radialSegments = 64;
  const tubularSegments = 64;
  const tube = 0.004;
  const arc = Math.PI * 2;
  return (
    <mesh>
      <torusGeometry args={[radius, tube, radialSegments, tubularSegments, arc]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
