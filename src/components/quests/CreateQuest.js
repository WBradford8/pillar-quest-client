import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export const CreateQuest = () => {
    const history = useHistory()
    const [quests, createQuest] = useState([]);
    const [pillars, setPillars] = useState([]);
    const userId = parseInt(localStorage.getItem("lu_token"))
    const [title, setTitle] = useState("")
    const [objective, setObjective] = useState("")
    const [checkedState, setCheckedState] = React.useState(
        new Array(pillars.length).fill(false)
    );
    const fetchQuests = () => {
        return fetch("https://pillar-quest.herokuapp.com/quests", {
            headers: {
                Authorization: `Token ${localStorage.getItem("lu_token")}`,
              },
        })
            .then(res => res.json())
            .then((questArray) => {
                    createQuest(questArray)
                 })
    }

    const fetchPillars = () => {
        return fetch("https://pillar-quest.herokuapp.com/pillars", {
            headers: {
                Authorization: `Token ${localStorage.getItem("lu_token")}`,
              },
        })

        
            .then(res => res.json())
    }
    useEffect(() => {
        fetchPillars().then((pillarArray) => setPillars(pillarArray));
      }, []);
    const handleOnChange = (position) => {
        const copyOfCheckedState = [
            ...checkedState
        ]
        const valued = parseInt(position.target.value)
        if ( checkedState.includes(valued)) {
            copyOfCheckedState.splice(checkedState.indexOf(valued), 1)
        } else {
            copyOfCheckedState.push(valued)
        }

        setCheckedState(copyOfCheckedState);
    }

    
    const addQuest = () => {
        const newQuest = {
            quest_title: title,
            quest_objective: objective,
            user: userId,
            completed: false,
            pillars: checkedState   
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(newQuest)
        }

        return fetch(`https://pillar-quest.herokuapp.com/quests`, fetchOptions)
            .then(response => response.json())
            .then( 
                () => history.push("/quests") 
            )
            
        

    }

    return (
        <div>
            <form
                onChange={
                    (evt) => {
                  setTitle(evt.target.value);
                        }} >
                <input type="text" id="quest_title" size="50" placeholder="Enter the title of your quest here."/>               
            </form>
            <form
                onChange={
                    (evt) => {
                  setObjective(evt.target.value);
                        }} >
                <input type="text" id="quest_objective" size="50" placeholder="Enter your goals for your quest and how you are going to accomplish it!"/>               
            </form>
            <ul className="pillars-list">
                            {pillars.map(({ label, id }, index) => {
                                return (
                                    <li key={index}>
                                        <div className="pillars-list-item">
                                            <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={label}
                                                    value={id}
                                                    onChange={(event) => handleOnChange(event)}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{label}</label>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
            <button
                onClick={
                    () => addQuest()
                }>
                SUBMIT
            </button>
        </div>
    )
};