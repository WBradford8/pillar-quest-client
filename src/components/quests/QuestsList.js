import React, { useEffect, useState } from "react";

// import "./PostFeed.css";

export const QuestList = () => {
  const [quests, setQuests] = useState([]);

  const deleteQuest = (id) => {
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
    fetchQuests().then((postArray) => 
      setQuests(postArray)
  
  )
},

[]);


  const fetchQuests = () => {
    return fetch(`http://localhost:8000/quests`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((res) => res.json())

  
  };

  return (
    <>
      <div className="headerContainer">
        <h1>Quests</h1>
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
              </div>
            );
          })}
      </div>
    </>
  );
};
