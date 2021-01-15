import React, { useState } from "react"
import "./App.css"
import "tachyons"
import Home from "./Home/home"
import LoginScreen from "./LoginScreen"

const App = () => {
	const [isSigned, setIsSigned] = useState(false)

	return (
		<div className="App">
			{!isSigned ? <LoginScreen setIsSigned={setIsSigned} /> : <Home />}
		</div>
	)
}

export default App
