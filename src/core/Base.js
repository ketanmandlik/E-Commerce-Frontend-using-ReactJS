import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-dark p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-light text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-light text-center py-3">
          <h4>If you got any Questions feel free to reach out</h4>
          <button className="btn btn-warning btn-lg">Contact-Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">MERN</span> Bootcamp
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
