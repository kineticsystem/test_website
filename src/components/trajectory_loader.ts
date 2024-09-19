import { SceneState } from "./scene_state";

interface Point {
  time_from_start: number;
  positions: number[];
}

interface Trajectory {
  joint_names: string[];
  points: Point[];
}

/**
 * Read and parse a JSON file containing trajectory data.
 * @param file The file to read.
 */
const readJsonFile = async (file: File): Promise<Trajectory> => {
  const text = await file.text();
  const data: Trajectory = JSON.parse(text);
  return data;
};

/**
 * Read a JSON file and return a sequence of Scene states.
 * @param file The file to read.
 * @returns A sequence of Scene states.
 */
export const parseTrajectory = async (file: File) => {
  const parsedData = await readJsonFile(file);

  const states = parsedData.points.map((point) => {
    const state: SceneState = {
      leftArm: {
        joint_1: point.positions[3],
        joint_2: Math.PI / 2,
        joint_3: -Math.PI / 2,
        joint_4: point.positions[4],
        joint_5: 0,
        joint_6: point.positions[5],
        joint_7: 0
      },
      rightArm: {
        joint_1: point.positions[6],
        joint_2: Math.PI / 2,
        joint_3: -Math.PI / 2,
        joint_4: point.positions[7],
        joint_5: 0,
        joint_6: point.positions[8],
        joint_7: 0
      },
      cylinder: {
        x: point.positions[0],
        y: point.positions[1],
        rotation: point.positions[2]
      }
    };
    return state;
  });
  return states;
};
