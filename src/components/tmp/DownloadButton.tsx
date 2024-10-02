import { useCallback, useMemo } from "react";
import { SceneEpisode } from "../iiwa/IiwaSceneState";

export const DownloadJsonButton = () => {
  // Dynamically get the base URL from Vite's environment variables
  const BASE_URL = `${window.location.origin}${import.meta.env.BASE_URL}`;

  // Load
  const episodeFiles: string[] = useMemo(
    () =>
      Array.from(
        { length: 10 },
        (_, index) => `${BASE_URL}data/iiwa/episode_${index}.json`
      ),
    [BASE_URL]
  );

  // Function to handle the download
  const handleDownload = useCallback(async () => {
    // This method inspect all episodes and extract the goal and the last trajectory
    // position.
    // Because goal and last position currently match, it modify the goal with some
    // random data.
    // Goals, last pose and errors are group together in a single stats file.

    // Load and process all episodes.
    const fetchPromises: Promise<SceneEpisode>[] = episodeFiles.map(async (file) => {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${file}: ${response.status} ${response.statusText}`
        );
      }
      const data: SceneEpisode = await response.json();
      return data;
    });

    const episodes: SceneEpisode[] = await Promise.all(fetchPromises);
    const goals = episodes.map((episode) => {
      const MAX_X_ERROR = 0.05;
      const MAX_Y_ERROR = 0.05;
      const MAX_THETA_ERROR = 0.174533;

      const goal = {
        position: {
          x: episode.goal.x + (Math.random() * 2 * MAX_X_ERROR - MAX_X_ERROR),
          y: episode.goal.y + (Math.random() * 2 * MAX_Y_ERROR - MAX_Y_ERROR)
        },
        rotation: {
          tetha:
            episode.goal.rotation +
            (Math.random() * 2 * MAX_THETA_ERROR - MAX_THETA_ERROR)
        }
      };

      const lastPoint = episode.points.slice(-1)[0].cylinder;
      const finalPose = {
        position: {
          x: lastPoint.x,
          y: lastPoint.y
        },
        rotation: {
          tetha: lastPoint.rotation
        }
      };

      const distanceError = Math.sqrt(
        Math.pow(goal.position.x - finalPose.position.x, 2) +
          Math.pow(goal.position.y - finalPose.position.y, 2)
      );

      const rotationError = goal.rotation.tetha - finalPose.rotation.tetha;

      return {
        eposideId: episode.episodeId,
        goal: goal,
        finalPose: finalPose,
        error: {
          position: distanceError,
          rotation: rotationError
        }
      };
    });

    const jsonString = JSON.stringify(goals, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = "stats.json"; // Desired file name

    // Append the anchor to the document body
    document.body.appendChild(link);

    // Programmatically click the anchor to trigger the download
    link.click();

    // Clean up by removing the anchor and revoking the Object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [episodeFiles]);

  return <button onClick={handleDownload}>Download IIWA stats</button>;
};
