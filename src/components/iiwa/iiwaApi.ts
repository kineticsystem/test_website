import { getAbsoluteUrl } from "../../http";
import { IiwaEpisode, IiwaStats } from "./IiwaSceneState";

/**
 * Fetch a JSON file containing an IIWA episode.
 * @param id The file id.
 * @returns An IIWA episode.
 */
export const fetchIiwaEpisode = async (id: number): Promise<IiwaEpisode> => {
  const url = getAbsoluteUrl(`data/iiwa/episode_${id}.json`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};

/**
 * Fetch a JSON file containing IIWA episodes stats.
 * @returns IIWA episodes stats.
 */
export const fetchIiwaStats = async (): Promise<IiwaStats> => {
  const url = getAbsoluteUrl(`data/iiwa/stats.json`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const episode = await response.json();
  return episode;
};
