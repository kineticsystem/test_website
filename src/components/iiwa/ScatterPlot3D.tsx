import { memo, useCallback, useEffect, useState } from "react";

import Plot from "react-plotly.js";
import { Data, Datum, Layout, PlotMouseEvent } from "plotly.js";
import { useQuery } from "@tanstack/react-query";
import { fetchIiwaStats } from "./iiwaApi";
import { IiwaStats } from "./IiwaSceneState";

/**
 * Props for the ScatterPlot3DComponent component.
 * @param onPointSelected A callback function invoked when the user clicks on
 * a point on the scatter plot.
 */
export interface ScatterPlot3DProps {
  onPointSelected: (id: number) => void;
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

  // Event handler for clicking on a point
  const handleClick = useCallback(
    (event: PlotMouseEvent) => {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        const index = point.customdata as number;
        if (index !== undefined) {
          onPointSelected(index);
        }
      }
    },
    [onPointSelected]
  );

  if (stats) {
    // Extracting goals information.
    const goalXPositions: number[] = stats.map((episode) => episode.goal.position.x);
    const goalMaxXPosition = Math.max(...goalXPositions);
    const goalMinXPosition = Math.min(...goalXPositions);

    const goalYPositions: number[] = stats.map((episode) => episode.goal.position.y);
    const goalMaxYPosition = Math.max(...goalYPositions);
    const goalMinYPosition = Math.min(...goalYPositions);

    const goalThetaPositions: number[] = stats.map(
      (episode) => episode.goal.rotation.theta
    );
    const goalMaxThetaPosition = Math.max(...goalThetaPositions);
    const goalMinThetaPosition = Math.min(...goalThetaPositions);

    // Extracting an array of position errors.
    const positionErrors: number[] = stats.map((episode) => episode.error.position);
    const positionMinError = Math.min(...positionErrors);
    const positionMaxError = Math.max(...positionErrors);

    const data: Data[] = [
      {
        name: "Episodes",
        x: goalXPositions,
        y: goalYPositions,
        z: goalThetaPositions,
        mode: "markers",
        type: "scatter3d",
        marker: {
          size: 12,
          color: positionErrors, // Use the error values for coloring
          colorscale: "Viridis",
          cmin: positionMinError, // Minimum of the error range
          cmax: positionMaxError, // Maximum of the error range
          colorbar: {
            thickness: 10, // Thickness of the colorbar
            len: 0.9, // Length of the colorbar
            x: 1.05, // Position it to the right of the plot
            y: 0.5
          }
        },
        customdata: stats.map((episode) => ({
          id: episode.episodeId
        })) as unknown as Datum[],
        hovertemplate: `<b>id:</b> %{customdata.id}<br><b>x:</b> %{x:.4f}<br><b>y:</b> %{y:.4f}<br><b>θ:</b> %{z:.4f}<br><extra></extra>`
      }
    ];

    const layout: Partial<Layout> = {
      scene: {
        xaxis: {
          title: "x",
          range: [goalMinXPosition, goalMaxXPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#DDDDDD",
          gridwidth: 1,
          tick0: 0,
          dtick: 2,
          zeroline: true,
          zerolinecolor: "#666666",
          zerolinewidth: 1
        },
        yaxis: {
          title: "y",
          range: [goalMinYPosition, goalMaxYPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#DDDDDD",
          gridwidth: 1,
          tick0: 0,
          dtick: 2,
          zeroline: true,
          zerolinecolor: "#666666",
          zerolinewidth: 1
        },
        zaxis: {
          title: "θ",
          range: [goalMinThetaPosition, goalMaxThetaPosition],
          fixedrange: true,
          showgrid: true,
          gridcolor: "#DDDDDD",
          gridwidth: 1,
          zeroline: true,
          zerolinecolor: "#666666",
          zerolinewidth: 1
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      },
      margin: { l: 0, r: 0, t: 0, b: 0 }, // Removes all margins
      showlegend: false,
      plot_bgcolor: "#F0F0F0",
      paper_bgcolor: "#F0F0F0"
    };

    return (
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
    );
  }

  return <div>OPS</div>;
};

// Memoize the named component
export const ScatterPlot3D = memo(ScatterPlot3DComponent);
