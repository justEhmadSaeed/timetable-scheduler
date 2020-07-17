import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  Button,
  MenuItem,
} from "@material-ui/core";
import "./subjectInput.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
    borderRadius: 20
  },
  title: {
    fontSize: 14,
  },
  textField: {
    margin: 5,
  },
  add: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
  button: {
    marginLeft: "5%",
  },
}));

export default function SubjectInput() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <h3>Add Subject</h3>
        <div>
          <TextField
            className={classes.textField}
            required
            id="course-title"
            label="Title"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            id="course-code"
            label="Course Code"
            variant="outlined"
          />
        </div>
        <div className={classes.add}>
          <TextField
            type="number"
            className={classes.textField}
            id="outlined-number"
            label="Credit Hours"
            select
            required
            onChange={handleChange}
            value={currency}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {[1, 2, 3].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
          >
            + Add Subject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
