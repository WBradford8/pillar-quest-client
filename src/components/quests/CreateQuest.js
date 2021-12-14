import React, { useEffect, useState } from "react";

export const CreateQuest = () => {
    const [quests, createQuest] = useState([]);
    const userId = parseInt(localStorage.getItem("lu_token"))
    const [title, setTitle] = useState("")
    const [objective, setObjective] = useState("")
    const [checkedState, setCheckedState] = React.useState(
        new Array(tags.length).fill(false)
    );
    const fetchQuests = () => {
        return fetch("http://localhost:8000/quests")
            .then(res => res.json())
            .then((questArray) => {
                    createQuest(questArray)
                 })
    }

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

    const addQuest = (event) => {
        const newQuest = {
            quest_title: title,
            quest_objective: objective,
            user: userId,
            completed: false,
            pillars: 0   
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuest)
        }

        return fetch(`http://localhost:8000/quests`, fetchOptions)
            .then(response => response.json())
            .then( 
                () => fetchQuests() 
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
            <ul className="tags-list">
                            {tags.map(({ description, id }, index) => {
                                return (
                                    <li key={index}>
                                        <div className="tags-list-item">
                                            <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={description}
                                                    value={id}
                                                    onChange={(event) => handleOnChange(event)}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{description}</label>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
            <button
                onClick={
                    (evt) => addQuest(evt)
                }>
                SUBMIT
            </button>
        </div>
    )
};