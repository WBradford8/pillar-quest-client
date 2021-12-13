import React from "react"
import { QuestList } from "./quests/QuestsList"
import { Route } from "react-router-dom"

export const ApplicationViews = () => {
    return <>
    <Route path="/quests">
      <QuestList/>
    </Route>  
    </>
}