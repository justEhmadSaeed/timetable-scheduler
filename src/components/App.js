import React, { Component } from "react";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import Logo from "./Logo/Logo";
import Particles from "react-particles-js";
import "tachyons";
import Home from "./Home/home";

firebase.initializeApp({
  apiKey: "AIzaSyBwPBLFoMMqwyUJcJewqLip4guij7CNjZg",
  authDomain: "activity-scheduling-d6be4.firebaseapp.com",
  databaseURL: "https://activity-scheduling-d6be4.firebaseio.com",
  projectId: "activity-scheduling-d6be4",
  storageBucket: "activity-scheduling-d6be4.appspot.com",
  messagingSenderId: "1050964579186",
  appId: "1:1050964579186:web:85db424e474670098b03eb",
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700,
      },
    },
  },
};

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
      signInSuccessWithAuthResult: () => false,
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
          <Home />
        ) : (
          <div>
            <Particles className="particles" params={particlesOptions} />
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
