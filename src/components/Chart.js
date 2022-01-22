import React from "react";

export const Chart = ({ children, width, height }) => (
  <svg
    className="bar-chart"
    viewBox={`0 0 ${width} ${height}`}
    width="100%"
    height="70%"
    preserveAspectRatio="xMidYMax meet"
  >
    {children}
  </svg>
);

export default Chart;
