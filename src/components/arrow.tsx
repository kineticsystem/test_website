import { useEffect, useRef } from "react";

import { Group, Vector3 } from "three";

interface ArrowProps {
  direction: Vector3;
  length: number;
  color: number;
  thickness?: number;
  headLength?: number;
  headThickness?: number;
  sectors?: number;
}

/**
 * This component displays an arrow from the origin pointing to the given direction.
 * @param direction Vector prepresenting the direction of the arrow.
 * @param color The arrow color.
 * @param length The arrow length.
 * @param thickness The shaft thickness.
 * @param headLength The arrow head length.
 * @param headThickness The arrow head thickness.
 * @param sectors The number of sectors used to draw the arrow shaft and head.
 * @returns An arrow.
 *
 */
export const Arrow = ({
  direction,
  color,
  length,
  thickness = 0.02,
  headLength = 0.2,
  headThickness = 0.1,
  sectors = 12
}: ArrowProps) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      // Normalize the direction vector
      const dir = direction.clone().normalize();
      // Align the arrow with the given direction
      groupRef.current.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), dir);
    }
  }, [direction]);

  return (
    <group ref={groupRef}>
      {/* Shaft */}
      <mesh renderOrder={1} position={[0, 0.5 * length - 0.5 * headLength, 0]}>
        <cylinderGeometry args={[thickness, thickness, length - headLength, sectors]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0, length - headLength, 0]}>
        <coneGeometry args={[headThickness, headLength, sectors]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};
