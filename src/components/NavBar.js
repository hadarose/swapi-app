import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => (
  <>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand font-monospace"
          style={{ opacity: 0.55 }}
          to="/"
        >
          SWAPI
        </Link>
        <div
          className="navbar collapse navbar-collapse"
          id="navbarNavDarkDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-controls="navbarNavDarkDropdown"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/part1">
                    Part 1: Trivia
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/part2">
                    Part 2: Chart
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
);

export default NavBar;
