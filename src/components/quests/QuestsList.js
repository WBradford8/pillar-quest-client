import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// import "./PostFeed.css";

export const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const history = useHistory();
  const deleteQuest = (id) => {
    if (window.confirm("Are you sure you want to delete this quest?") == false)
      return;
    fetch(`http://localhost:8000/quests/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    }).then(() => {
      fetchQuests();
    });
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const fetchQuests = () => {
    return fetch(`http://localhost:8000/quests?incompleted`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((res) => res.json())
      .then((postArray) => setQuests(postArray));
  };

  const completeQuest = (evt, title, objective, pillars) => {
    const newQuest = {
      quest_title: title,
      quest_objective: objective,
      user: parseInt(localStorage.getItem("lu_token")),
      completed: true,
      pillars: pillars,
    };
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(newQuest),
    };

    fetch(`http://localhost:8000/quests/${evt.target.id}`, fetchOptions)
      .then((response) => response.json())
      
  };

  return (
    <>
      <div className="mainContainer">
      <button
            className="btn btn-create"
            onClick={() => {
              history.push({ pathname: "/pillars" });
            }}
          >GO TO THE PILLARS</button>
        <div className="headerContainer">
          <h1>Quests</h1>
        </div>
        <div>
          <button
            className="btn btn-create"
            onClick={() => {
              history.push({ pathname: "/quests/create" });
            }}
          >
            + QUEST
          </button>
        </div>
        <div className="questContainer">
          {quests
            ?.slice()
            ?.reverse()
            ?.map((questObject) => {
              return (
                <div className="currentQuests">
                  <h2>{questObject?.quest_title}</h2>
                  <h3>{questObject?.quest_objective}</h3>
                  {questObject.pillars.map((pillar) => {
                    return <h4>{pillar.label}</h4>;
                  })}
                  <button
                    onClick={() => {
                      deleteQuest(questObject.id);
                    }}
                  >
                    DELETE QUEST
                  </button>
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      history.push({ pathname: `/quests/edit/${questObject.id}` });
                    }}
                  >
                    Edit Quest
                  </button>
                  <button 
                    id={questObject.id}
                    onClick={(evt) => {
                      completeQuest(evt, questObject.quest_title, questObject.quest_objective, questObject.pillars);history.push("/pillars");
                    }}
                    >Complete Quest</button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
