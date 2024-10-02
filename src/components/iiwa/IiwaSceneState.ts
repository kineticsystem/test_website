/**
 * These types are used to represent the trajectories of each object
 * in the scene.
 */

export interface ArmState {
  joint0: number;
  joint1: number;
  joint2: number;
  joint3: number;
  joint4: number;
  joint5: number;
  joint6: number;
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

export interface SceneEpisode {
  goal: CylinderState;
  points: SceneState[];
}
