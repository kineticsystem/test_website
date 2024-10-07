import { memo, useCallback, useEffect, useState } from "react";

import Plot from "react-plotly.js";
import { Data, Layout, PlotMouseEvent } from "plotly.js";
import { useQuery } from "@tanstack/react-query";
import { fetchIiwaStats } from "./iiwaApi";
import { IiwaStats } from "./IiwaSceneState";

// Enum representing the error type to be displayed on the 3D plot.
enum ErrorType {
  Position = "Position error",
  Rotation = "Rotation error"
}

/**
 * Props for the ScatterPlot3DComponent component.
 * @param onPointSelected A callback function invoked when the user clicks on
 * a point on the scatter plot.
 */
export interface ScatterPlot3DProps {
  onPointSelected: (id: string) => void;
}

/**
 * This is a component to display a scatter plot and invoke a callback when
 * a point is clicked.
 *
 * IMPORTANT:
 * The Plot component does not work well with "memo". In this scenario,
 * all mouse events are not correctly connected and fail to fire.
 * Two workarounds have to be implemented to resolve the problem:
 * 1. An initialization state must to be added and updated on the first mount
 *    to trigger a re-rendering;
 * 2. The onClick event must be given a function reference and not a handler
 *    reference.
 * @param props {@link ScatterPlot3DProps}
 * @returns A scatter plot.
 */
export const ScatterPlot3DComponent = ({ onPointSelected }: ScatterPlot3DProps) => {
  // Initialization state.
  const [, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  // Load stats.
  const { data: stats } = useQuery<IiwaStats, Error>({
    queryKey: ["iiwaStats"],
    queryFn: fetchIiwaStats
  });

  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.Position);

  /**
   * Handles the change event for the error type selection.
   * @param event - The change event triggered by the input element.
   */
  const handleErrorTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as ErrorType;
    setErrorType(selectedValue);
  };

  // Event handler for clicking on a point
  const handleClick = useCallback(
    (event: PlotMouseEvent) => {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        const id = point.customdata as string;
        if (id !== undefined) {
          onPointSelected(id);
        }
      }
    },
    [onPointSelected]
  );

  if (stats) {
    const ids: string[] = stats.map((episode) => episode.episodeId);

    // Extract the delta x between the initial position and the goal.
    const goalXPositions: number[] = stats.map(
      (episode) => episode.goal.position.x - episode.initialPose.position.x
    );
    const goalMaxXPosition = Math.max(...goalXPositions);
    const goalMinXPosition = Math.min(...goalXPositions);

    // Extract the delta y between the initial position and the goal.
    const goalYPositions: number[] = stats.map(
      (episode) => episode.goal.position.y - episode.initialPose.position.y
    );
    const goalMaxYPosition = Math.max(...goalYPositions);
    const goalMinYPosition = Math.min(...goalYPositions);

    // Extract the delta theta between the initial position and the goal.
    const goalThetaPositions: number[] = stats.map(
      (episode) => episode.goal.rotation.theta - episode.initialPose.rotation.theta
    );
    const goalMaxThetaPosition = Math.max(...goalThetaPositions);
    const goalMinThetaPosition = Math.min(...goalThetaPositions);

    let errors: number[] = [];
    let minError = 0;
    let maxError = 0;

    if (errorType === ErrorType.Position) {
      // Calculate the distance between the goal and the final position.
      errors = stats.map((episode) =>
        Math.sqrt(
          Math.pow(episode.goal.position.x - episode.finalPose.position.x, 2) +
            Math.pow(episode.goal.position.y - episode.finalPose.position.y, 2)
        )
      );
      minError = Math.min(...errors);
      maxError = Math.max(...errors);
    } else {
      // Calculate the rotation error between the goal and the final position.
      errors = stats.map((episode) =>
        Math.abs(episode.goal.rotation.theta - episode.finalPose.rotation.theta)
      );
      minError = Math.min(...errors);
      maxError = Math.max(...errors);
    }

    // Prepare the plot data.
    const data: Data[] = [
      {
        name: "Episodes",
        x: goalXPositions,
        y: goalYPositions,
        z: goalThetaPositions,
        mode: "markers",
        type: "scatter3d",
        marker: {
          size: 4,
          color: errors, // Use the error values for coloring.
          colorscale: "Viridis",
          cmin: minError, // Minimum of the error range.
          cmax: maxError, // Maximum of the error range.
          colorbar: {
            tickformat: ".3f", // Format ticks to three decimal places.
            thickness: 10,
            len: 0.9,
            x: 1.05, // Position it to the right of the plot.
            y: 0.5
          }
        },
        customdata: ids,
        hovertemplate: `<b>Δx:</b> %{x:.4f}<br><b>Δy:</b> %{y:.4f}<br><b>Δθ:</b> %{z:.4f}<br><extra></extra>`
      }
    ];

    // Prepare the plot layout.
    const layout: Partial<Layout> = {
      scene: {
        xaxis: {
          title: "Δx",
          range: [goalMinXPosition, goalMaxXPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#AAAAAA",
          gridwidth: 1,
          tick0: 0,
          zeroline: true,
          zerolinecolor: "#000000",
          zerolinewidth: 1
        },
        yaxis: {
          title: "Δy",
          range: [goalMinYPosition, goalMaxYPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#AAAAAA",
          gridwidth: 1,
          tick0: 0,
          zeroline: true,
          zerolinecolor: "#000000",
          zerolinewidth: 1
        },
        zaxis: {
          title: "Δθ",
          range: [goalMinThetaPosition, goalMaxThetaPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#AAAAAA",
          gridwidth: 1,
          tick0: 0,
          zeroline: true,
          zerolinecolor: "#000000",
          zerolinewidth: 1
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 },
          center: { x: 0.1, y: -0.1, z: -0.1 }
        }
      },
      margin: { l: 0, r: 0, t: 0, b: 0 }, // Removes all margins
      showlegend: false,
      plot_bgcolor: "#F0F0F0",
      paper_bgcolor: "#F0F0F0"
    };

    return (
      <>
        {/* Radio Buttons */}
        <div className="absolute top-3 left-4 z-10 bg-white bg-opacity-75 p-2 rounded shadow">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              name="errorType"
              value="Position error"
              checked={errorType === ErrorType.Position}
              onChange={handleErrorTypeChange}
              className="mr-2"
            />
            Position error
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="errorType"
              value="Rotation error"
              checked={errorType === ErrorType.Rotation}
              onChange={handleErrorTypeChange}
              className="mr-2"
            />
            Rotation error
          </label>
        </div>
        <div className="w-full">
          <div className="aspect-square bg-white rounded-md overflow-hidden">
            <Plot
              data={data}
              layout={layout}
              // This event does not work with a handler reference, and must be
              // given a function reference instead.
              onClick={(event: PlotMouseEvent) => handleClick(event)}
              config={{
                responsive: true,
                displayModeBar: false
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </>
    );
  }

  return <div></div>;
};

// Memoize the named component
export const ScatterPlot3D = memo(ScatterPlot3DComponent);
