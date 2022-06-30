import React from "react"
import "./index.scss"
import reportWebVitals from "./reportWebVitals"
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
const root = ReactDOMClient.createRoot(document.getElementById("root")!)

root.render(
	<ChakraProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
