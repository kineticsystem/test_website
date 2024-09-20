/**
 * These types are used to represent the object coordinates in the scene.
 */

export interface ArmState {
  joint1: number;
  joint2: number;
  joint3: number;
  joint4: number;
  joint5: number;
  joint6: number;
  joint7: number;
}

export interface CylinderState {
  x: number;
  y: number;
  rotation: number;
}

export interface SceneState {
  timeFromStart: number;
  leftArm: ArmState;
  rightArm: ArmState;
  cylinder: CylinderState;
}

export interface GoalTrajectory {
  goal: CylinderState;
  points: SceneState[];
}
