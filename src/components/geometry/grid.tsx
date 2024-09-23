/**
 * Props for the Grid component.
 * @property size The size if the grid in squares.
 * @property primaryColor The primary grid color.
 * @property secondaryColor The secondary grid color.
 */
export interface GridProps {
  size: number;
  primaryColor?: string | number;
  secondaryColor?: string | number;
}

/**
 * This is grid component on the (x,y) plane.
 * @param props {@link GridProps}
 * @returns A grid component.
 */
export const Grid = ({
  size = 6,
  primaryColor = "#3a3a3a",
  secondaryColor = "#aaaaaa"
}: GridProps) => {
  return (
    <group rotation-x={Math.PI / 2}>
      {/* 1-decimeter blocks */}
      <gridHelper args={[size, size * 10, primaryColor, primaryColor]} />
      {/* 1-meter blocks */}
      <gridHelper args={[size, size, secondaryColor, secondaryColor]} />
    </group>
  );
};
