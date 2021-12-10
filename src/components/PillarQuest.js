import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationsViews.js"

import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const PillarQuest = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("lu_token")) {
                return <>
                    <Route render={props => <ApplicationViews {...props} />}/>


                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>

    </>
)