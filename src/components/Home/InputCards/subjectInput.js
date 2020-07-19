import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  Button,
  MenuItem,
} from "@material-ui/core";

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
  add: {
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
  const [hrs, setCreditHrs] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [creditHrsError, setCreditHrsError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };
  const hrsChange = (event) => {
    setCreditHrs(event.target.value);
  };
  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
    !hrs ? setCreditHrsError("Required") : setCreditHrsError("");
  };
  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");
    setCreditHrs("");

    setTitleError("");
    setCodeError("");
    setCreditHrsError("");
  };
  const addButton = () => {
    let temp = [...subjects];
    if (title && code && hrs) {
      if (temp) {
        if (temp.findIndex((e) => e[1] === code) === -1)
          temp.push([title, code, hrs]);
        else {
          setRequiredError();
          setCodeError("Subject already exists");
          return;
        }
      } else temp = [[title, code, hrs]];

      setSubjects(temp);
      setEmptyTextfields();
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
        <div className={classes.add}>
          <TextField
            type="number"
            className={classes.textField}
            id="outlined-number"
            label="Credit Hours"
            select
            required
            error={!!creditHrsError}
            helperText={creditHrsError}
            onChange={hrsChange}
            value={hrs}
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
            onClick={addButton}
          >
            + Add Subject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
