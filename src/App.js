import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Trivia from "./components/Trivia";
import Planets from "./components/Planets";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        let response = await axios.get("https://swapi.py4e.com/api/vehicles/");
        let vehiclesData = response.data.results;
        setVehicles(vehiclesData);
      } catch (error) {
        console.log(error);
      }
    };

    const getPlanets = async () => {
      try {
        let response = await axios.get("https://swapi.py4e.com/api/planets");
        let planetsData = response.data.results;
        setPlanets(planetsData);
      } catch (error) {
        console.log(error);
      }
    };

    getVehicles();
    getPlanets();
  }, []);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/part1">
          <Trivia vehicles={vehicles} />
        </Route>
        <Route exact path="/part2">
          <Planets planets={planets} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
