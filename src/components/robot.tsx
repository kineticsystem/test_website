import { URDFRobot } from "urdf-loader";

export interface RobotProps {
  robot: URDFRobot;
  position: [number, number, number];
}

/**
 * Component to display a robotic arm.
 */
export const Robot = ({ robot, position }: RobotProps) => {
  return <primitive object={robot} position={position} />;
};
