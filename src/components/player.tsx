import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { Range } from "react-range";

enum PlayerState {
  Completed = "Complete",
  Paused = "Pause",
  Playing = "Play",
  Beginning = "Beginning"
}

/**
 * Props for the PlayerIcon component.
 * @param playerState The player state.
 */
interface PlayerIconProps {
  playerState: PlayerState;
}

/**
 * This is the icon to display on the player control button based on the
 * current player state.
 * @param props {@link PlayerIconProps}
 * @returns The icon to display on the control button.
 */
const PlayerIcon = ({ playerState }: PlayerIconProps) => {
  switch (playerState) {
    case PlayerState.Completed:
      return <FontAwesomeIcon icon={faRedoAlt} />;
      break;
    case PlayerState.Playing:
      return <FontAwesomeIcon icon={faPause} />;
      break;
    case PlayerState.Paused:
      return <FontAwesomeIcon icon={faPlay} />;
      break;
    case PlayerState.Beginning:
      return <FontAwesomeIcon icon={faPlay} />;
      break;
  }
};

/**
 * Props for the player component.
 * @param sequence A sequence of elements.
 * @param onFrameChanged A callback invoked when the frame changes.
 */
export interface PlayerProps<T> {
  sequence: T[];
  onFrameChanged: (state: T) => void;
}

/**
 * This is a player component. The user can play and pause a sequence and
 * select the current frame using a control bar.
 * @param props {@link PlayerProps}
 * @returns A sequence player.
 */
export const Player = <T,>({ sequence, onFrameChanged }: PlayerProps<T>) => {
  // The player state.
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.Beginning);

  // Current frame.
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Ref to store the playback interval.
  const intervalRef = useRef<number | null>(null);

  // Auto play when the sequence is set.
  useEffect(() => {
    if (sequence?.length > 0) {
      setCurrentFrameIndex(0);
      setPlayerState(PlayerState.Playing);
    }
  }, [sequence]);

  useEffect(() => {
    if (sequence?.length > 0) {
      onFrameChanged(sequence[currentFrameIndex]);
    }
  }, [currentFrameIndex, onFrameChanged, sequence]);

  // Setup an interval to play the sequence.
  useEffect(() => {
    if (playerState === PlayerState.Playing && currentFrameIndex < sequence.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => prev + 1);
      }, 50);
    } else if (currentFrameIndex === sequence.length - 1) {
      setPlayerState(PlayerState.Completed);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentFrameIndex, playerState, sequence]);

  // Playback controls.
  const handlePlayPause = () => {
    switch (playerState) {
      case PlayerState.Completed:
        setCurrentFrameIndex(0);
        setPlayerState(PlayerState.Playing);
        break;
      case PlayerState.Beginning:
      case PlayerState.Paused:
        setPlayerState(PlayerState.Playing);
        break;
      case PlayerState.Playing:
        setPlayerState(PlayerState.Paused);
        break;
    }
  };

  // Progress bar.
  const handleProgressBarChange = (newFrameIndex: number) => {
    if (newFrameIndex === sequence.length - 1) {
      setPlayerState(PlayerState.Completed);
    } else {
      setPlayerState(PlayerState.Paused);
    }
    setCurrentFrameIndex(newFrameIndex);
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handlePlayPause}
        disabled={sequence.length === 0}
        style={styles.button}
      >
        <PlayerIcon playerState={playerState} />
      </button>

      {sequence.length > 1 ? (
        <Range
          step={1}
          min={0}
          max={sequence.length - 1}
          values={[currentFrameIndex]}
          allowOverlap={true}
          onChange={(values) => handleProgressBarChange(values[0])}
          renderTrack={({ props, children }) => (
            <div {...props} style={styles.renderTrack}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{ height: "10px", width: "10px", backgroundColor: "#3b82f6" }}
            />
          )}
        />
      ) : (
        <div style={styles.renderTrack} />
      )}
    </div>
  );
};

// CSS-in-JS styles for the component
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    width: "100%"
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    width: "1.5rem", // Set fixed width
    height: "1.5rem", // Set fixed height
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  renderTrack: {
    height: "2px",
    backgroundColor: "#ccc",
    width: "100%"
  }
};
