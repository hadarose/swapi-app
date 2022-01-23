import React from "react";
import yodaLogo from "../utils/yoda.jpg";
import starWarsLogo from "../utils/Star_Wars_Logo.svg";

export const Home = () => (
  <div className="d-flex justify-content-center flex-column">
    <div className="d-flex flex-row mx-auto align-items-center">
      <h1 className="display-1 text-white fw-bold">SWAPI</h1>
      <img src={yodaLogo} alt="Yoda logo" width="100px" height="100px" />
      <h1 className="display-1 text-white fw-bold">APP</h1>
    </div>

    <img
      src={starWarsLogo}
      className="img-fluid rounded mx-auto d-block"
      alt="Star Wars Logo"
    />
  </div>
);

export default Home;
