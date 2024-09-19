/**
 * These types are used to represent the object coordinates in the scene.
 */

export interface ArmState {
  joint_1: number;
  joint_2: number;
  joint_3: number;
  joint_4: number;
  joint_5: number;
  joint_6: number;
  joint_7: number;
}

export interface CylinderState {
  x: number;
  y: number;
  rotation: number;
}

export interface SceneState {
  leftArm: ArmState;
  rightArm: ArmState;
  cylinder: CylinderState;
}
