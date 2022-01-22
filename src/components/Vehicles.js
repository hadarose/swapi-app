import React, { useState, useEffect } from "react";
import axios from "axios";

export const Vehicles = ({ vehicles }) => {
  const [maxPopVehicle, setMaxPopVehicle] = useState("");
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    let pilotsUrls = vehicles.map((vehicle) => vehicle.pilots).flat();
    let maxSum = 0;

    vehicles.forEach((vehicle) => {
      let sum = 0;
      vehicle.pilots.forEach(async (pilot) => {
        try {
          let response = await axios.get(pilot);
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
      <div className="container text-white">
        <div className="row">
          <div className="col-md-12 border border-warning pt-2 pb-2">
            Vehicle name with the highest sum of population for all its pilots'
            home planets:{" "}
            <span className="text-warning fw-bold">{maxPopVehicle}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 border border-warning pt-2 pb-2">
            Related home planets and their respective population{" "}
          </div>
        </div>

        <div className="row">
          <div className="col-12 border border-warning pt-2 pb-2">
            Related pilot names:{" "}
            <ul>
              {pilots.map((pilot, index) => (
                <li key={index}>{pilot}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
