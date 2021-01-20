import React, { useEffect, useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "../firebase/firebase"
import Logo from "../components/Logo/Logo"
import Particles from "react-particles-js"
import Loader from "react-loader-spinner"

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
}

const LoginScreen = ({ setIsSigned }) => {
	const [loading, setLoading] = useState(true)

	let uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	}
	useEffect(() => {
		let isMounted = true
		firebase.auth().onAuthStateChanged((user) => {
			// setIsLoggedIn(!!user)
			if (user) {
				setIsSigned(true)
				console.log("User Logged In")
			} else {
				console.log("User Signed Out")
				setIsSigned(false)
			}
			if (isMounted) setLoading(false)
		})
		return () => (isMounted = false)
	}, [setIsSigned])
	return (
		<div>
			{loading ? (
				<div className="loading">
					<div id="logo-name">Activity Scheduler</div>
					<Loader
						color="#FFFFFF"
						width={200}
						height={130}
						type="Audio"
					/>
				</div>
			) : (
				<div>
					<Particles className="particles" params={particlesOptions} />
					<Logo></Logo>
					<div className="firebaseUI">
						<StyledFirebaseAuth
							uiConfig={uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
export default LoginScreen
