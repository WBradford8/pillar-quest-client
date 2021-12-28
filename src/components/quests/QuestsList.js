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

    fetch(`http://localhost:8000/quests/${evt.target.id}`, fetchOptions).then(
      (response) => response.json()
    );
  };

  return (
    <>
      <div className="container">
        <button
          className="hero button is-primary is-large is-fullwidth"
          onClick={() => {
            history.push({ pathname: "/pillars" });
          }}
        >
          GO TO THE PILLARS
        </button>
        <div className="headerContainer">
          <h1 className="title is-1">Quests</h1>
        </div>
        <div>
          <button
            className="button is-info is-medium"
            onClick={() => {
              history.push({ pathname: "/quests/create" });
            }}
          >
            + QUEST
          </button>
        </div>
        <div className="columns">
          {quests
            ?.slice()
            ?.reverse()
            ?.map((questObject) => {
              return (
                <div className="column">
                  <h2 className="title">{questObject?.quest_title}</h2>
                  <h3><b>Your objective: </b>{questObject?.quest_objective}</h3>
                  {questObject.pillars.map((pillar) => {
                    return (
                      <ul>
                        <li><b>{pillar.label}</b></li>
                      </ul>
                    );
                  })}
                  <div className="button has-addons is-centered">
                    <button
                      className="button is-danger"
                      onClick={() => {
                        deleteQuest(questObject.id);
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 12 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="button is-warning"
                      onClick={() => {
                        history.push({
                          pathname: `/quests/edit/${questObject.id}`,
                        });
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="#000"
                          stroke-width="2"
                          d="M14,4 L20,10 L14,4 Z M22.2942268,5.29422684 C22.6840146,5.68401459 22.6812861,6.3187139 22.2864907,6.71350932 L9,20 L2,22 L4,15 L17.2864907,1.71350932 C17.680551,1.319449 18.3127724,1.31277239 18.7057732,1.70577316 L22.2942268,5.29422684 Z M3,19 L5,21 M7,17 L15,9"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="button is-success"
                      id={questObject.id}
                      onClick={(evt) => {
                        completeQuest(
                          evt,
                          questObject.quest_title,
                          questObject.quest_objective,
                          questObject.pillars
                        );
                        history.push("/pillars");
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm-42.7 318.9L106.7 260.3l29.9-29.9 76.8 76.8 162.1-162.1 29.9 29.9-192.1 191.9z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
