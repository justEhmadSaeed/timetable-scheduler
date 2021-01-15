import firebase from "firebase"

const firebaseConfig = {
	apiKey: "AIzaSyBwPBLFoMMqwyUJcJewqLip4guij7CNjZg",
	authDomain: "activity-scheduling-d6be4.firebaseapp.com",
	databaseURL: "https://activity-scheduling-d6be4.firebaseio.com",
	projectId: "activity-scheduling-d6be4",
	storageBucket: "activity-scheduling-d6be4.appspot.com",
	messagingSenderId: "1050964579186",
	appId: "1:1050964579186:web:85db424e474670098b03eb",
}

firebase.initializeApp(firebaseConfig)
firebase.auth()

export default firebase
