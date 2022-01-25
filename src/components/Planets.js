import React from "react";
import maxBy from "lodash.maxby";
import Chart from "./Chart";
import Bar from "./Bar";

const SCALE = 100000;

export const Planets = ({ planets }) => {
  let customPlanets = planets
    .filter((planet) => planet.population !== "unknown")
    .map((planet) => {
      return {
        ...planet,
        convertedPopulation: Number(planet.population) / SCALE,
      };
    });

  const maxPopulation = maxBy(
    customPlanets,
    (planet) => planet.convertedPopulation
  ).convertedPopulation;

  const barWidth = 75;
  const barMargin = 30;
  const bars = planets.length;
  const chartHeight = maxPopulation > 500 ? 500 : maxPopulation;
  let chartWidth = bars * (barWidth + barMargin);

  return (
    <>
      <h1 className="display-6 text-white">Home Planets Population</h1>
      <p className="legend mt-3">
        <span className="population">Population</span>
        <span className="highest-population">Highest Population</span>
      </p>

      <Chart height={chartHeight} width={chartWidth}>
        {customPlanets.map((planet, index) => {
          const barHeight =
            planet.convertedPopulation > 50000
              ? chartHeight
              : planet.convertedPopulation / 100;

          return (
            <Bar
              key={planet.url}
              x={index * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
              planet={planet.name}
              isHighest={maxPopulation === planet.convertedPopulation}
              chartHeight={chartHeight}
              originalPopulation={planet.population}
            />
          );
        })}
      </Chart>
    </>
  );
};

export default Planets;
