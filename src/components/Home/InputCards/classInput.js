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
        <h3>Add Class</h3>
        <div>
          <TextField
            className={classes.textField}
            required
            id="class-title"
            label="Class Title"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            id="class-code"
            label="Class Code"
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
            + Add Class
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
