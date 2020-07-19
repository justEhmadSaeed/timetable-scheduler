import React from "react";
import Tilt from "react-tilt";
import activity from "./activity.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      margin: "2rem",
      marginTop: 0,
    },
  },
  Tilt: {
    background: "linear-gradient(89deg, #ff5edf 0%, #04c8de 100%)",
    borderRadius: ".25rem",
    boxShadow: "0px 0px 8px 2px rgba( 0, 0, 0, 0.2 )",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      marginTop: "20%",
      width: "600px",
    },
  },
}));

const Logo = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Tilt
        className={classes.Tilt}
        options={{ max: 25 }}
        style={{ height: 400, width: 600 }}
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
