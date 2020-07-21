import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  Button,
  MenuItem,
} from "@material-ui/core";
import docs from "../../../constants/docs";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
  },
  textField: {
    margin: 5,
  },
  hrs: {
    margin: "5% 10%",
  },
  hours: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
  button: {
    marginLeft: "5%",
  },
}));

export default function SubjectInput({ subjects, setSubjects }) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [contactHrs, setcontantHrs] = React.useState("");
  const [creditHrs, setcreditHrs] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [contantHrsError, setcontantHrsError] = React.useState("");
  const [creditHrsError, setcreditHrsError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };
  const contacthrsChange = (event) => {
    setcontantHrs(event.target.value);
  };
  const creditrsChange = (event) => {
    setcreditHrs(event.target.value);
  };
  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
    !contactHrs ? setcontantHrsError("Required") : setcontantHrsError("");
    !creditHrs ? setcreditHrsError("Required") : setcreditHrsError("");
  };
  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");
    setcontantHrs("");
    setcreditHrs("");

    setTitleError("");
    setCodeError("");
    setcontantHrsError("");
    setcreditHrsError("");
  };
  const addButton = () => {
    let temp = [...subjects];
    if (title && code && contactHrs && creditHrs) {
      if (creditHrs <= contactHrs) {
        if (temp) {
          if (temp.findIndex((e) => e[1] === code) === -1)
            temp.push([title, code, contactHrs, creditHrs]);
          else {
            setRequiredError();
            setCodeError("Subject already exists");
            return;
          }
        } else temp = [[title, code, contactHrs, creditHrs]];
        setSubjects(temp, docs.subjects);
        setEmptyTextfields();
      } else {
        setcreditHrsError("Credits hrs must !> contact hrs");
      }
    } else {
      setRequiredError();
    }
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <h3>Add Subject</h3>
        <div>
          <TextField
            className={classes.textField}
            onChange={titleChange}
            value={title}
            required
            id="course-title"
            label="Title"
            variant="outlined"
            error={!!titleError}
            helperText={titleError}
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            value={code}
            onChange={codeChange}
            id="course-code"
            label="Course Code"
            variant="outlined"
            error={!!codeError}
            helperText={codeError}
          />
        </div>
        <div className={classes.hours}>
          <TextField
            type="number"
            className={classes.hrs}
            id="credit-hours"
            label="Credit Hours"
            select
            required
            error={!!creditHrsError}
            helperText={creditHrsError}
            onChange={creditrsChange}
            value={creditHrs}
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
          <TextField
            type="number"
            className={classes.hrs}
            id="contact-hours"
            label="Contact Hours"
            select
            required
            error={!!contantHrsError}
            helperText={contantHrsError}
            onChange={contacthrsChange}
            value={contactHrs}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
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
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          onClick={addButton}
        >
          + Add Subject
        </Button>
      </CardContent>
    </Card>
  );
}
