import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Trivia from "./components/Trivia";
import Planets from "./components/Planets";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/part1">
          <Trivia />
        </Route>
        <Route exact path="/part2">
          <Planets />
        </Route>
      </Switch>
    </>
  );
}

export default App;
