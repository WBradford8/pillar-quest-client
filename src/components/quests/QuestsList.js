import React, { useEffect, useState } from "react";
import { GiIonicColumn } from "react-icons/gi"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Quests.css"
// import "./PostFeed.css";

export const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const history = useHistory();
  const deleteQuest = (id) => {
    if (window.confirm("Are you sure you want to delete this quest?") == false)
      return;
    fetch(`https://pillar-quest.herokuapp.com/quests/${id}`, {
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
    return fetch(`https://pillar-quest.herokuapp.com/quests?incompleted`, {
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

    fetch(`https://pillar-quest.herokuapp.com/quests/${evt.target.id}`, fetchOptions).then(
      (response) => response.json()
    );
  };

  return (
    <>
    <div className="quests">
      <div className="container">
        <button
          className="hero button is-primary is-large is-fullwidth"
          onClick={() => {
            history.push({ pathname: "/pillars" });
          }}
        >
           <div className="buttonFlex"><GiIonicColumn size="40"/> <p>TO THE PILLARS</p> <GiIonicColumn size="40"/></div>
          
        </button>
        <div className="headerContainer">
          <h1 className="title is-1">Quests <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M66.54 18.002c-.327-.007-.655-.005-.98.006-4.064.136-8.105 1.634-11.39 4.535-7.508 6.632-8.218 18.094-1.586 25.602 4.394 4.974 10.906 6.945 16.986 5.792l57.838 65.475-50.373 44.498 24.188 27.38c9.69-21.368 22.255-39.484 37.427-54.65l6.91 36.188c25.092-6.29 49.834-10.563 74.366-12.873l-23.912-27.07-38.66-12.483c17.117-12.9 36.734-22.97 58.62-30.474l-24.19-27.385-50.37 44.496-57.92-65.57c1.79-5.835.617-12.43-3.72-17.34-3.498-3.96-8.34-6.03-13.235-6.128zm384.397 0c-4.895.1-9.735 2.168-13.232 6.127-4.338 4.91-5.514 11.506-3.723 17.343l-57.92 65.568-50.37-44.497-24.188 27.385c21.884 7.504 41.5 17.573 58.62 30.472l-38.66 12.485-23.255 26.324c24.71 1.863 49.367 5.706 74.118 11.46l6.498-34.03c15.173 15.166 27.74 33.282 37.43 54.65l24.185-27.38-50.372-44.498 57.838-65.475c6.08 1.153 12.593-.818 16.987-5.792 6.63-7.508 5.92-18.97-1.586-25.602-3.285-2.9-7.326-4.4-11.39-4.535-.326-.01-.653-.013-.98-.006zm-186.425 158.51c-39.56-.098-79.467 5.226-120.633 16.095-2.046 90.448 34.484 209.35 118.47 259.905 81.295-49.13 122.402-169.902 120.552-259.914-39.75-10.496-78.91-15.988-118.39-16.086zm-117.176 153.5L60.47 428.35l-12.2 63.894 61.9-19.994 68.49-77.535c-12.86-20.108-23.246-42.03-31.324-64.703zm228.203 6.11c-8.69 22.238-19.577 43.634-32.706 63.142l64.473 72.986 61.898 19.994-12.2-63.894-81.466-92.23z"></path></svg></h1>
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
        <div className="container">
          {quests
            ?.slice()
            ?.reverse()
            ?.map((questObject) => {
              return (
                <div className="card">
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
                        // fetchQuests();
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
        <div>
                      <p>"The point of this app is to help young students gamify their daily progress.  Turn mundane tasks into 'Quests', which will benefit their life." Created by Wade Bradford</p>
                      <p>DIRECTIONS: <br></br></p>
                    </div>
      </div>
      </div>
    </>
  );
};
