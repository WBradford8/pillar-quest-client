import React from "react"
import { QuestList } from "./quests/QuestsList"
import { Route } from "react-router-dom"
import { CreateQuest } from "./quests/CreateQuest"
import { EditQuest } from "./quests/EditQuest"
export const ApplicationViews = () => {
    return <>
    <Route exact path="/quests">
      <QuestList/>
    </Route>
    <Route exact path="/quests/create">
      <CreateQuest/>
    </Route>
    <Route exact path="/quests/edit/:questId(\d+)">
      <EditQuest/>
    </Route>      
    </>
}