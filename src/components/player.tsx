import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";

export interface PlayerProps<T> {
  sequence: T[];
  onFrameChanged: (state: T) => void;
}

export const Player = <T,>({
  sequence,
  onFrameChanged: onStateChanged
}: PlayerProps<T>) => {
  // State to control playback
  const [isPlaying, setIsPlaying] = useState(false);

  // Current frame.
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const [isComplete, setIsComplete] = useState(false);

  // Ref to store the playback interval.
  const intervalRef = useRef<number | null>(null);

  // Auto play when the sequence is set.
  useEffect(() => {
    if (sequence?.length > 0) {
      setCurrentFrameIndex(0);
      setIsComplete(false);
      setIsPlaying(true);
    }
  }, [sequence]);

  useEffect(() => {
    if (sequence?.length > 0) {
      onStateChanged(sequence[currentFrameIndex]);
    }
  }, [currentFrameIndex, onStateChanged, sequence]);

  // Setup an interval to play the sequence.
  useEffect(() => {
    if (isPlaying && currentFrameIndex < sequence.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => prev + 1);
      }, 50);
    } else if (currentFrameIndex === sequence.length - 1) {
      setIsPlaying(false);
      setIsComplete(true);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentFrameIndex, sequence]);

  // Playback controls
  const handlePlayPause = () => {
    if (isComplete) {
      setCurrentFrameIndex(0);
      setIsComplete(false);
    }
    setIsPlaying((prev) => !prev);
  };

  // Progress bar.
  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameIndex = Number(e.target.value);
    setCurrentFrameIndex(newFrameIndex);
    if (newFrameIndex === sequence.length - 1) {
      setIsComplete(true);
      setIsPlaying(false);
    } else {
      setIsComplete(false);
    }
  };

  return (
    <div>
      <button onClick={handlePlayPause} disabled={sequence.length === 0}>
        {isComplete ? (
          <FontAwesomeIcon icon={faRedoAlt} />
        ) : isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <input
        type="range"
        min="0"
        max={sequence.length - 1}
        value={currentFrameIndex}
        onChange={handleProgressBarChange}
        style={{ width: "100%" }}
      />
      <div>
        Frame {currentFrameIndex + 1} of {sequence.length}
      </div>
    </div>
  );
};
