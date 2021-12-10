import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom"
import { PillarQuest } from "./components/PillarQuest.js"

import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        
        <Router>
            <PillarQuest />
        </Router>
        
    </React.StrictMode>,
    document.getElementById("root")
)
