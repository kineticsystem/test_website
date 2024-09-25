import Plot from "react-plotly.js";
import { PlotMouseEvent, Data, Layout } from "plotly.js";

const ScatterPlot = () => {
  const data: Data[] = [
    {
      x: [1, 2, 3, 4, 5],
      y: [2, 3, 1, 5, 4],
      mode: "markers",
      type: "scatter",
      marker: { size: 12 }
    }
  ];

  const layout: Partial<Layout> = {
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
    margin: { l: 0, r: 0, t: 0, b: 0 } // Removes all margins
  };

  // Event handler for clicking on a point
  const handleClick = (event: PlotMouseEvent) => {
    const pointIndex = event.points[0].pointIndex;
    const x = event.points[0].x;
    const y = event.points[0].y;

    alert(`Dot clicked at X: ${x}, Y: ${y}, Index: ${pointIndex}`);
  };

  return (
    <div className="w-full">
      <div className="aspect-square bg-white rounded-md overflow-hidden">
        <Plot
          data={data}
          layout={layout}
          onClick={handleClick} // Attach click handler here
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

export default ScatterPlot;
