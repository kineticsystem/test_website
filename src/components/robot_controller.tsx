import React, { useEffect, useRef, useState } from "react";

import { SceneState } from "./scene_state";
import { parseTrajectory } from "./trajectory_loader";

export interface SceneControllerProps {
  onStateChanged: (state: SceneState) => void;
}

export const SceneController = ({ onStateChanged }: SceneControllerProps) => {
  // State to hold the sequence of SceneStates.
  const [sceneSequence, setSceneSequence] = useState<SceneState[]>([]);

  // State to control playback
  const [isPlaying, setIsPlaying] = useState(false);

  // Current frame.
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Ref to store the playback interval
  const intervalRef = useRef<number | null>(null);

  // Parse the file and populate the sequence of SceneStates.
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const newSceneSequence = await parseTrajectory(file);
        setSceneSequence(newSceneSequence);
        onStateChanged(newSceneSequence[0]);
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Only set up interval if playback is active
      intervalRef.current = setInterval(() => {
        setCurrentFrameIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < sceneSequence.length) {
            onStateChanged(sceneSequence[nextIndex]);
            return nextIndex;
          } else {
            setIsPlaying(false); // Stop playing when the end is reached
            return prevIndex;
          }
        });
      }, 50);
    } else if (intervalRef.current !== null) {
      // Clear the interval if playback is paused or stopped
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Clean up on unmount
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, onStateChanged, sceneSequence]);

  // Playback controls

  const handlePlay = () => {
    if (sceneSequence.length > 0) {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
    if (sceneSequence.length > 0) {
      onStateChanged(sceneSequence[0]);
    }
  };

  return (
    <div>
      {/* File Input */}
      <input type="file" accept=".json,application/json" onChange={handleFileSelect} />
      <button onClick={handlePlay} disabled={isPlaying || sceneSequence.length === 0}>
        Play
      </button>
      <button onClick={handlePause} disabled={!isPlaying}>
        Pause
      </button>
      <button onClick={handleStop} disabled={!isPlaying && currentFrameIndex === 0}>
        Stop
      </button>
    </div>
  );
};
