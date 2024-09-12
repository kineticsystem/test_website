import { createContext, PropsWithChildren } from "react";

import { URDFRobot } from "urdf-loader";

import { useSuspenseQuery } from "@tanstack/react-query";

import URDFLoaderAdapter from "../components/urdf-loader-adapter";

const loader = new URDFLoaderAdapter();

/**
 * This is Context Creator.
 */
export const RobotContext = createContext<URDFRobot | undefined>(undefined);

/**
 * Fetch URDF and load the robot asynchronously.
 */
const fetchAndLoadRobot = async (url: string): Promise<URDFRobot> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URDF: ${response.statusText}`);
  }

  const urdfData = await response.text();
  const loadedRobot = await loader.loadAsync(URL.createObjectURL(new Blob([urdfData])));

  return loadedRobot;
};

/**
 * This is the Context Provider i.e. the component that provides the
 * new context and the object within.
 */
export const RobotContextProvider = ({
  url,
  children
}: PropsWithChildren<{ url: string }>) => {
  const { data: robot } = useSuspenseQuery({
    queryKey: ["robot"],
    queryFn: () => fetchAndLoadRobot(url)
  });

  return <RobotContext.Provider value={robot}>{children}</RobotContext.Provider>;
};
