import { SceneStateSequence } from "./scene_state";

/**
 * Read and parse a JSON file containing trajectory data.
 * @param file The file to read.
 */
export const readTrajectory = async (file: File): Promise<SceneStateSequence> => {
  const text = await file.text();
  const data: SceneStateSequence = JSON.parse(text);
  return data;
};
