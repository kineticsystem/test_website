import { useRef } from "react";

import { Mesh } from "three";

interface CylinderProps {
  radius: number;
  height: number;
  color: string;
  opacity?: number;
}

/**
 * This is a cylinder oriented along the z-axis.
 */
export const Cylinder = ({ radius, height, color, opacity = 1 }: CylinderProps) => {
  const cylinderRef = useRef<Mesh>(null);
  return (
    <mesh ref={cylinderRef} rotation-x={Math.PI / 2} castShadow receiveShadow>
      <cylinderGeometry attach="geometry" args={[radius, radius, height]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};
