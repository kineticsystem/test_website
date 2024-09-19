import { useRef } from "react";

import { Group, Vector3 } from "three";

import { Arrow } from "./arrow";

interface FrameProps {
  position?: Vector3;
  size?: number;
  thickness?: number;
}

/**
 * This component displays a coordinate frame with three arrows (x, y, z).
 * @param position The location of the frame.
 * @param size The frame arrows length.
 * @param thickness The frame arrows thickness.
 * @param A coordinate frame.
 */
export const Frame = ({
  position = new Vector3(0, 0, 0),
  size = 1,
  thickness = 0.005
}: FrameProps) => {
  const groupRef = useRef<Group>(null);
  const centerRadius = 0.01;
  const sphereSectors = 30;
  const headThickness = 4 * thickness;
  const headLength = 0.1;
  return (
    <group position={position} ref={groupRef}>
      <mesh>
        <sphereGeometry args={[centerRadius, sphereSectors, sphereSectors]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      <Arrow
        direction={new Vector3(1, 0, 0)}
        length={size}
        color={0x9d4b4b}
        thickness={thickness}
        headThickness={headThickness}
        headLength={headLength}
      />
      <Arrow
        direction={new Vector3(0, 1, 0)}
        length={size}
        color={0x2f7f4f}
        thickness={thickness}
        headThickness={headThickness}
        headLength={headLength}
      />
      <Arrow
        direction={new Vector3(0, 0, 1)}
        length={size}
        color={0x3b5b9d}
        thickness={thickness}
        headThickness={headThickness}
        headLength={headLength}
      />
    </group>
  );
};
