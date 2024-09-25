import { memo, useCallback, useEffect, useState } from "react";

import Plot from "react-plotly.js";
import { Data, Layout, PlotMouseEvent } from "plotly.js";

/**
 * Props for the ScatterPlotComponent component.
 * @param onPointSelected A callback function invoked when the user clicks on
 * a point on the scatter plot.
 */
export interface ScatterPlotProps {
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
 * @param props {@link ScatterPlotProps}
 * @returns A scatter plot.
 */
export const ScatterPlotComponent = ({ onPointSelected }: ScatterPlotProps) => {
  // Initialization state.
  const [, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const data: Data[] = [
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [1.1, 1.9, 3.3, 4.1, 4.8, 4.4, 6.3, 7, 8.2, 10],
      mode: "markers",
      type: "scatter",
      marker: { size: 12 },
      customdata: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  ];

  const layout: Partial<Layout> = {
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
    margin: { l: 0, r: 0, t: 0, b: 0 } // Removes all margins
  };

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
};

// Memoize the named component
export const ScatterPlot = memo(ScatterPlotComponent);
