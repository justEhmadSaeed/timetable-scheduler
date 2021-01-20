import React, { useState } from "react"
import "./App.css"
import "tachyons"
import LoginScreen from "./Pages/LoginScreen"
import HomeScreen from "./Pages/HomeScreen"

const App = () => {
	const [isSigned, setIsSigned] = useState(false)

	return (
		<div className="App">
			{!isSigned ? <LoginScreen setIsSigned={setIsSigned} /> : <HomeScreen />}
		</div>
	)
}

export default App
