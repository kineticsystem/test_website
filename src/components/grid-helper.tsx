import { GridHelperProps } from "@react-three/fiber";

/**
 * This is a double-sided grid helper component.
 * @param {Object} props - The props for the GridHelper component.
 * @param {number} [props.size=5] - The size of the grid. Optional, default is 5.
 * @param {GridHelperProps} props.rest - Additional properties from Three.js GridHelper.
 * @returns A double-sided grid.
 */
const GridHelper = ({ size = 5, ...props }: { size?: number } & GridHelperProps) => {
  return (
    <group>
      {/* 1-decimeter blocks */}
      <gridHelper args={[size, size * 10, 0x3a3a3a, 0x3a3a3a]} {...props} />
      {/* 1-meter blocks */}
      <gridHelper args={[size, size, 0xaaaaaa, 0xaaaaaa]} {...props} />
    </group>
  );
};

export default GridHelper;
