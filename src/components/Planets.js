import React, { useEffect, useState } from "react";
import axios from "axios";
import maxBy from "lodash.maxby";
import Chart from "./Chart";
import Bar from "./Bar";

const SCALE = 100000;

export const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const [maxPop, setMaxPop] = useState();
  const barWidth = 75;
  const barMargin = 30;

  useEffect(() => {
    const getPlanets = async () => {
      try {
        let response = await axios.get("https://swapi.py4e.com/api/planets");
        let planetsData = response.data.results;

        let customPlanets = planetsData
          .filter((planet) => planet.population !== "unknown")
          .map((planet) => {
            return {
              ...planet,
              convertedPopulation: Number(planet.population) / SCALE,
            };
          });

        setPlanets(customPlanets);
      } catch (error) {
        console.log(error);
      }
    };

    getPlanets();
  }, []);

  useEffect(() => {
    if (planets.length === 0) {
      return;
    }

    const maxPopulation = maxBy(
      planets,
      (planet) => planet.convertedPopulation
    ).convertedPopulation;

    const bars = planets.length;
    setChartHeight(maxPopulation > 500 ? 500 : maxPopulation);
    setChartWidth(bars * (barWidth + barMargin));
    setMaxPop(maxPopulation);
  }, [planets]);

  return (
    <>
      <h1 className="display-6 text-white">Home Planets Population</h1>
      <p className="legend mt-3">
        <span className="population">Population</span>
        <span className="highest-population">Highest Population</span>
      </p>

      <Chart height={chartHeight} width={chartWidth}>
        {planets.map((planet, index) => {
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
              isHighest={maxPop === planet.convertedPopulation}
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
