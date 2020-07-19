import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Card, CardContent, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: 20,
    margin: 10,
  },
  textField: {
    margin: 5,
  },
  button: {
    marginTop: "7%",
  },
}));

export default function TeacherInput({ teachers, setTeachers }) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");

  const [nameError, setNameError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };

  const setRequiredError = () => {
    !name ? setNameError("Required") : setNameError("");
    !code ? setCodeError("Required") : setCodeError("");
  };

  const setEmptyTextfields = () => {
    setName("");
    setCode("");

    setNameError("");
    setCodeError("");
  };
  const addButton = () => {
    let temp = [...teachers];
    if (name && code) {
      if (temp) {
        if (temp.findIndex((e) => e[1] === code) === -1)
          temp.push([name, code]);
        else {
          setRequiredError();
          setCodeError("Subject already exists");
          return;
        }
      } else temp = [[name, code]];

      setTeachers(temp);
      setEmptyTextfields();
    } else {
      setRequiredError();
    }
  };

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
            value={name}
            onChange={nameChange}
            error={!!nameError}
            helperText={nameError}
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            id="teacher-code"
            label="Teacher Code"
            variant="outlined"
            error={!!codeError}
            helperText={codeError}
            value={code}
            onChange={codeChange}
          />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
            onClick={addButton}
          >
            + Add Teacher
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
