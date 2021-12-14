import React from "react"
import { QuestList } from "./quests/QuestsList"
import { Route } from "react-router-dom"
import { CreateQuest } from "./quests/CreateQuest"

export const ApplicationViews = () => {
    return <>
    <Route path="/quests">
      <QuestList/>
    </Route>
    <Route path="/quests/create">
      <CreateQuest/>
    </Route>   
    </>
}