import { useContext } from "react";
import { CameraContext } from "../context/camera-context";

/**
 * This is the Context Consumer i.e. the method that returns the object stored
 * within the context.
 */
export const useCameraContext = () => {
  const camera = useContext(CameraContext);
  if (camera === undefined) {
    throw new Error("Tried to use CameraContext outside of a CameraContextProvider!");
  } else {
    return camera;
  }
};
