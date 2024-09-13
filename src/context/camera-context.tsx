import { createContext, PropsWithChildren, useCallback, useReducer } from "react";
import { Vector3 } from "three";

const intitialTarget = new Vector3(0, 0.2, 0);

const initialState = {
  key: 0,
  controlsEnabled: true,
  target: intitialTarget,
  movedCamera: false
};

/**
 * This is Context Creator.
 */

interface CameraContextValue {
  cameraState: CameraState;
  setControlsEnabled: (enabled: boolean) => void;
  resetCameraPosition: () => void;
  setTarget: (target: Vector3, movedCamera: boolean) => void;
}

export const CameraContext = createContext<CameraContextValue | undefined>(undefined);

/**
 * This is the Context Provider i.e. the component that provides the
 * new context and the object within.
 */

interface CameraState {
  key: number;
  controlsEnabled: boolean;
  target: Vector3;
  movedCamera: boolean;
}

export const CameraProvider = ({ children }: PropsWithChildren) => {
  const [cameraState, dispatch] = useReducer(
    (state: CameraState, action: Partial<CameraState>) => {
      return { ...state, ...action };
    },
    initialState
  );

  const setControlsEnabled = useCallback((controlsEnabled: boolean) => {
    dispatch({ controlsEnabled });
  }, []);

  const resetCameraPosition = useCallback(() => {
    dispatch({ key: cameraState.key + 1, target: intitialTarget });
  }, [cameraState.key]);

  const setTarget = useCallback((target: Vector3, movedCamera: boolean) => {
    dispatch({ target, movedCamera });
  }, []);

  return (
    <CameraContext.Provider
      value={{
        cameraState,
        setControlsEnabled,
        resetCameraPosition,
        setTarget
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
