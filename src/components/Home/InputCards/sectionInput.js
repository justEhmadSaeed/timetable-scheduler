import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Card,  Button } from "@material-ui/core";
import docs from "../../../constants/docs";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    borderRadius: 20,
    margin: 10,
    minHeight: 360,
    display: 'grid',
  },
  title: {
    fontSize: 14,
  },
  textField: {
    margin: 5,
  },

  button: {
  },
}));

export default function SectionInput({ sections, setSections }) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };

  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
  };

  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");

    setTitleError("");
    setCodeError("");
  };
  const addButton = () => {
    let temp = [...sections];
    if (title && code) {
      if (temp) {
        if (temp.findIndex((e) => e[1] === code) === -1)
          temp.push([title, code]);
        else {
          setRequiredError();
          setCodeError("Subject already exists");
          return;
        }
      } else temp = [[title, code]];

      setSections(temp, docs.sections);
      setEmptyTextfields();
    } else {
      setRequiredError();
    }
  };
  return (
    <Card className={classes.root}>
      <h3>Add Section</h3>
      <div>
        <TextField
          className={classes.textField}
          required
          id="class-title"
          label="Class Title"
          variant="outlined"
          value={title}
          onChange={titleChange}
          error={!!titleError}
          helperText={titleError}
        />
      </div>
      <div>
        <TextField
          required
          className={classes.textField}
          id="class-code"
          label="Class Code"
          variant="outlined"
          error={!!codeError}
          helperText={codeError}
          value={code}
          onChange={codeChange}
          onKeyDown={(e) => {
            if (e.keyCode === 13) addButton();
          }}
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
          + Add Section
        </Button>
      </div>
    </Card>
  );
}
