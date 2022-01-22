import React from "react";

export const Bar = ({
  x,
  y,
  width,
  height,
  planet,
  isHighest,
  chartHeight,
  originalPopulation,
}) => (
  <>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={isHighest ? "purple" : "black"}
    />
    <text x={x + 5} y={chartHeight - 2} fill={"white"} className="fw-bold">
      {planet}
    </text>
    <text x={x} y={isHighest ? 15 : y - 20} className="fw-bold">
      {originalPopulation}
    </text>
  </>
);

export default Bar;
