/**
 * These types are used to represent the trajectories of each object
 * in the scene.
 */

export interface IiwaArmState {
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

export interface IiwaSceneState {
  timeFromStart: number;
  leftArm: IiwaArmState;
  rightArm: IiwaArmState;
  cylinder: CylinderState;
}

export interface IiwaEpisode {
  episodeId: number;
  goal: CylinderState;
  points: IiwaSceneState[];
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
    position: number;
    rotation: number;
  };
}

export type IiwaStats = IiwaEpisodeInfo[];
