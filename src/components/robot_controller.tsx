import React, { useState, useEffect, useRef } from "react";
import { SceneState } from "./scene_state";

interface Point {
  time_from_start: number;
  positions: number[];
}

interface Trajectory {
  joint_names: string[];
  points: Point[];
}

const readJsonFile = (file: Blob): Promise<Trajectory> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result as string));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });

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
    if (event.target.files) {
      try {
        const parsedData = await readJsonFile(event.target.files[0]);

        const newSceneSequence = parsedData.points.map((point) => {
          const sceneState: SceneState = {
            leftArm: {
              joint_1: point.positions[3] - Math.PI / 2,
              joint_2: Math.PI / 2,
              joint_3: -Math.PI / 2,
              joint_4: -point.positions[4],
              joint_5: 0,
              joint_6: -point.positions[5],
              joint_7: 0
            },
            rightArm: {
              joint_1: point.positions[6] - Math.PI / 2,
              joint_2: Math.PI / 2,
              joint_3: -Math.PI / 2,
              joint_4: -point.positions[7],
              joint_5: 0,
              joint_6: -point.positions[8],
              joint_7: 0
            },
            cylinder: {
              x: point.positions[1],
              y: -point.positions[0],
              rotation: point.positions[2]
            }
          };
          return sceneState;
        });
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
      <h1>Robot Scene Controller</h1>

      {/* File Input */}
      <input type="file" accept=".json,application/json" onChange={handleFileSelect} />

      {/* Playback Controls */}
      <div>
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
    </div>
  );
};
