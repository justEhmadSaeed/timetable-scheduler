import React, { Component } from "react";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import Logo from "./Logo/Logo";
import 'tachyons';

firebase.initializeApp({
  apiKey: "AIzaSyBwPBLFoMMqwyUJcJewqLip4guij7CNjZg",
  authDomain: "activity-scheduling-d6be4.firebaseapp.com",
  databaseURL: "https://activity-scheduling-d6be4.firebaseio.com",
  projectId: "activity-scheduling-d6be4",
});

class App extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => firebase.auth().signOut()}
            >
              Sign Out
            </Button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          </span>
        ) : (
          <div>
            <Logo></Logo>
            <div className="firebaseUI">
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
