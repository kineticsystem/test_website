/**
 * These types are used to represent the trajectories of each object
 * in the scene.
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

export interface IiwaSceneState {
  timeFromStart: number;
  leftArm: ArmState;
  rightArm: ArmState;
  cylinder: CylinderState;
}

export interface IiwaSceneEpisode {
  goal: CylinderState;
  points: IiwaSceneState[];
}
