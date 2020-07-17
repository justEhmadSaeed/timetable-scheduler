import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import "./subjectInput.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: 20,
    margin: 10,
  },
  title: {
    fontSize: 14,
  },
  textField: {
    margin: 5,
  },
  button: {
    marginTop: "7%",
  },
}));

export default function ClassInput() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <h3>Add Teacher</h3>
        <div>
          <TextField
            className={classes.textField}
            required
            id="teacher-name"
            label="Teacher Name"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            id="teacher-code"
            label="Teacher Code"
            variant="outlined"
          />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
          >
            + Add Teacher
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
