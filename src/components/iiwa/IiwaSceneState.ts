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
  position: {
    x: number;
    y: number;
  };
  rotation: {
    theta: number;
  };
}

export interface SceneState {
  timeFromStart: number;
  leftArm: ArmState;
  rightArm: ArmState;
  cylinder: CylinderState;
}

export interface IiwaEpisode {
  episodeId: number;
  goal: CylinderState;
  points: SceneState[];
}

export interface IiwaEpisodeInfo {
  episodeId: number;
  goal: {
    position: {
      x: number;
      y: number;
    };
    rotation: {
      theta: number;
    };
  };
  finalPose: {
    position: {
      x: number;
      y: number;
    };
    rotation: {
      theta: number;
    };
  };
  error: {
    distance: number;
    rotation: number;
  };
}

export type Stats = IiwaEpisodeInfo[];
