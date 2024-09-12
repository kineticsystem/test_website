import { createContext, PropsWithChildren } from "react";
import { URDFRobot } from "urdf-loader";
import useSuspendQuery from "../hooks/use-suspend-query";
import URDFLoaderAdapter from "../components/urdf-loader-adapter";

const loader = new URDFLoaderAdapter();

/**
 * This is Context Creator.
 */
export const RobotContext = createContext<URDFRobot | undefined>(undefined);

/**
 * This is the Context Provider i.e. the component that provides the
 * new context and the object within.
 */
export const RobotContextProvider = ({
  url,
  children
}: PropsWithChildren<{ url: string }>) => {
  const robot = useSuspendQuery(async () => {
    const response = await fetch(url);
    const urdfData = await response.text();
    return loader.loadAsync(URL.createObjectURL(new Blob([urdfData])));
  }, [url]);

  return <RobotContext.Provider value={robot}>{children}</RobotContext.Provider>;
};
