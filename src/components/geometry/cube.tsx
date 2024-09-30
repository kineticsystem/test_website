import { useRef } from "react";

import { Mesh } from "three";
import * as THREE from "three";

interface CubeProps {
  size: number;
  opacity?: number;
}

/**
 * This is a cube oriented along the z-axis.
 */
export const Cube = ({ size, opacity = 1 }: CubeProps) => {
  const cubeRef = useRef<Mesh>(null);
  return (
    <mesh ref={cubeRef} rotation-x={Math.PI / 2} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[size, size, size]} />
      {/* Red. */}
      <meshStandardMaterial
        attach="material-0"
        color="#FF0000"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      {/* Green. */}
      <meshStandardMaterial
        attach="material-1"
        color="#00FF00"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      {/* Green. */}
      <meshStandardMaterial
        attach="material-2"
        color="#0000FF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      {/* Yellow. */}
      <meshStandardMaterial
        attach="material-3"
        color="#FFFF00"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      {/* Magenta. */}
      <meshStandardMaterial
        attach="material-4"
        color="#FF00FF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      {/* Cyan. */}
      <meshStandardMaterial
        attach="material-5"
        color="#00FFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
