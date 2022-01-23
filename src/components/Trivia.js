import React, { useState, useEffect } from "react";
import axios from "axios";

export const Trivia = ({ vehicles }) => {
  const [maxPopVehicle, setMaxPopVehicle] = useState("");
  const [pilots, setPilots] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    let pilotsUrls = vehicles.map((vehicle) => vehicle.pilots).flat();
    let planetsUrls = [];
    let maxSum = 0;

    // Suming up pilots' population
    vehicles.forEach((vehicle) => {
      let sum = 0;
      vehicle.pilots.forEach(async (pilot) => {
        try {
          let response = await axios.get(pilot);
          // Getting related homeplanets
          let responsePlanets = await axios.get(response.data.homeworld);
          planetsUrls.push({
            name: responsePlanets.data.name,
            population: responsePlanets.data.population,
          });
          // Getting planets' population
          let homeWorld = await axios.get(response.data.homeworld);
          sum += Number(homeWorld.data.population);
          if (sum > maxSum) {
            maxSum = sum;
            setMaxPopVehicle(vehicle.name);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });

    // Saving related home planets' names
    setPlanets(planetsUrls);

    // Getting related pilots' names
    pilotsUrls.forEach(async (pilotUrl) => {
      try {
        let response = await axios.get(pilotUrl);
        setPilots((pilots) => [...pilots, response.data.name]);
      } catch (error) {
        console.log(error);
      }
    });
  }, [vehicles]);

  return (
    <div className="d-flex flex-column">
      <h2 className="display-6 text-white text-center mt-3 mb-3">
        Star Wars Trivia
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-md-12 border border-warning pt-2 pb-2 text-warning">
            Vehicle name with the highest sum of population for all its pilots'
            home planets:
            <div className="text-white fw-bold pt-2 pb-2">{maxPopVehicle}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 border border-warning pt-2 pb-2 text-warning">
            Related home planets and their respective population:
            <ul>
              {planets.map((planet, index) => (
                <li key={index} className="text-white pt-2">
                  Planet: {planet.name}, Population: {planet.population}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12 border border-warning pt-2 pb-2 text-warning">
            Related pilot names:{" "}
            <ul>
              {pilots.map((pilot, index) => (
                <li key={index} className="text-white pt-2">
                  {pilot}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trivia;
