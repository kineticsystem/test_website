import { useRef } from "react";

import * as THREE from "three";
import { Mesh, Texture } from "three";
import { TextureLoader } from "three";

import { useLoader } from "@react-three/fiber";

interface CubeProps {
  size: number;
  opacity?: number;
}

/**
 * This is a cube oriented along the z-axis.
 */
export const Cube = ({ size, opacity = 1 }: CubeProps) => {
  // Dynamically get the base URL from Vite's environment variables
  const BASE_URL = `${window.location.origin}${import.meta.env.BASE_URL}`;

  const cubeRef = useRef<Mesh>(null);

  const texture: Texture[] = useLoader(TextureLoader, [
    `${BASE_URL}models/allegro/textures/1.jpg`,
    `${BASE_URL}models/allegro/textures/2.jpg`,
    `${BASE_URL}models/allegro/textures/3.jpg`,
    `${BASE_URL}models/allegro/textures/4.jpg`,
    `${BASE_URL}models/allegro/textures/5.jpg`,
    `${BASE_URL}models/allegro/textures/6.jpg`
  ]) as Texture[];

  return (
    <mesh ref={cubeRef} rotation-x={Math.PI / 2} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial
        attach="material-0"
        color="#FFFFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[1]}
      />
      <meshStandardMaterial
        attach="material-1"
        color="#FFFFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[3]}
      />
      <meshStandardMaterial
        attach="material-2"
        color="#FFFFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[0]}
      />
      <meshStandardMaterial
        attach="material-3"
        color="#FFFFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[5]}
      />
      <meshStandardMaterial
        attach="material-4"
        color="#FFFFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[4]}
      />
      <meshStandardMaterial
        attach="material-5"
        color="#FFFFFF"
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        map={texture[2]}
      />
    </mesh>
  );
};
