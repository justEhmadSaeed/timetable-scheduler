import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "./Appbar";
import SubjectInput from "./InputCards/subjectInput";
import ClassInput from "./InputCards/classInput";
import TeacherInput from "./InputCards/teacherInput";

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  card: {},
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <PrimaryAppBar />
      <div className={classes.cardHolder}>
        <SubjectInput className={classes.card} />
        <ClassInput className={classes.card} />
        <TeacherInput className={classes.card} />
      </div>
    </div>
  );
};

export default Home;
