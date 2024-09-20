import { useEffect, useRef, useState } from "react";

export interface PlayerProps<T> {
  sequence: T[];
  onFrameChanged: (state: T) => void;
}

export const Player = <T,>({
  sequence: sceneSequence,
  onFrameChanged: onStateChanged
}: PlayerProps<T>) => {
  // State to control playback
  const [isPlaying, setIsPlaying] = useState(false);

  // Current frame.
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Ref to store the playback interval
  const intervalRef = useRef<number | null>(null);

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
