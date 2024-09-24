import { useEffect, useRef, useState } from "react";

import { Range } from "react-range";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

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

enum PlayerState {
  InitialState,
  Completed,
  Paused,
  Playing
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
    case PlayerState.InitialState:
    case PlayerState.Paused:
      return <FontAwesomeIcon icon={faPlay} />;
      break;
    case PlayerState.Playing:
      return <FontAwesomeIcon icon={faPause} />;
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
  // Used to check when the sequence changes.
  const prevSequenceRef = useRef<T[]>(sequence);

  // Current frame.
  const [frame, setFrame] = useState(0);

  // The player state.
  const [state, setState] = useState<PlayerState>(PlayerState.InitialState);

  // Ref to store the playback interval.
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (sequence?.length > 0) {
      // Check if the sequence has changed.
      if (prevSequenceRef.current != sequence) {
        prevSequenceRef.current = sequence;
        setFrame(0);
        setState(PlayerState.Playing);
      }

      if (state == PlayerState.Playing) {
        if (frame < sequence.length - 1) {
          // Start the timer.
          intervalRef.current = setInterval(() => {
            setFrame((prev) => prev + 1);
          }, 50);
        } else if (frame === sequence.length - 1) {
          setState(PlayerState.Completed);
        }
        onFrameChanged(sequence[frame]);
      } else if (state == PlayerState.Paused) {
        onFrameChanged(sequence[frame]);
      }
    }
    return () => {
      // Method called immediately after a dependency changes.
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sequence, frame, state, onFrameChanged]);

  // Playback control, only available when sequence length > 0.
  const handlePlayPause = () => {
    switch (state) {
      case PlayerState.Completed:
      case PlayerState.InitialState:
      case PlayerState.Paused:
        setFrame(0);
        setState(PlayerState.Playing);
        break;
      case PlayerState.Playing:
        setState(PlayerState.Paused);
        break;
    }
  };

  // bar handle, only available when the sequence length is greater than 0.
  const handleProgressBarChange = (newFrame: number) => {
    if (newFrame < sequence.length - 1) {
      setState(PlayerState.Paused);
      setFrame(newFrame);
    } else if (newFrame === sequence.length - 1) {
      setState(PlayerState.Completed);
      setFrame(newFrame);
    }
  };

  return (
    <div style={styles.container}>
      {/* Button enabled when the sequence length is greater than 0. */}
      <button
        onClick={handlePlayPause}
        disabled={sequence.length <= 1}
        style={styles.button}
      >
        <PlayerIcon playerState={state} />
      </button>
      {/* Component enabled when the sequence length is greater than 0. */}
      {sequence.length > 1 ? (
        <Range
          step={1}
          min={0}
          max={sequence.length - 1}
          values={[frame]}
          allowOverlap={true}
          onChange={(values) => handleProgressBarChange(values[0])}
          renderTrack={({ props, children }) => (
            <div {...props} style={styles.renderTrack}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            // We cannot spread props with "key" values into a div.
            // We must destructure the "key" to prevent warnings.
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps} // Spread the rest without key.
                style={{ height: "10px", width: "10px", backgroundColor: "#3b82f6" }}
              />
            );
          }}
        />
      ) : (
        <div style={styles.renderTrack} />
      )}
    </div>
  );
};
