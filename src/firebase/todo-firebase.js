// Rename the file name to firebase.js

import firebase from "firebase"

const firebaseConfig = {
    // UnComment the Below Portion and ADD your fireabase config keys

	// apiKey: "API_KEY_HERE",
	// authDomain: "AUTH_DOMAIN",
	// databaseURL: "DATABASE_URL",
	// projectId: "PROJECT_ID,
	// storageBucket: "STORAGE_BUCKET",
	// messagingSenderId: "MESSAGINGSENDERID",
	// appId: "APP_ID",
}

firebase.initializeApp(firebaseConfig)
firebase.auth()

export default firebase