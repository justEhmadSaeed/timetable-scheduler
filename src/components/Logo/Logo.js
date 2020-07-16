import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import activity from "./activity.png";

const Logo = () => {
  return (
    <div
      className="ma4 mt0"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 35 }}
        style={{ height: 400, width: 800 }}
      >
        <div className="Tilt-inner pa3">
          <img
            src={activity}
            style={{ paddingTop: "5px" }}
            alt="activity scheduling"
          ></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
