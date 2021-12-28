import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const EditQuest = () => {
  const history = useHistory();
  const [quest, setQuests] = useState([]);
  const [quests, createQuest] = useState([]);
  const [pillars, setPillars] = useState([]);
  const userId = parseInt(localStorage.getItem("lu_token"));
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [checkedState, setCheckedState] = React.useState(
    new Array(pillars.length).fill(false)
  );
  const [currentQuest, setCurrentQuest] = useState({
    quest_title: "",
    quest_objective: "",
    completed: false,
    pillars: checkedState   
})

  const editQuest = (quest) => {
    return fetch(`https://pillar-quest.herokuapp.com/quests/${quest.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quest),
    }).then(fetchQuests);
  };

  const getSingleQuest = (id) => {
    return fetch(`https://pillar-quest.herokuapp.com/quests/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((res) => res.json())
  };

  const fetchQuests = () => {
    return fetch(`https://pillar-quest.herokuapp.com/quests`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((res) => res.json())
      .then((postArray) => setQuests(postArray));
  };

  const fetchPillars = () => {
    return fetch("https://pillar-quest.herokuapp.com/pillars", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    }).then((res) => res.json());
  };
  useEffect(() => {
    fetchPillars().then((pillarArray) => setPillars(pillarArray));
  }, []);

  const { questId } = useParams();
  useEffect(() => {
    if (questId) {
      getSingleQuest(questId).then((singleQuestData) => {
        setCurrentQuest(singleQuestData);
        const checkForPillar = singleQuestData.pillars.map((pillar) => {
          return pillar.id;
        });
        setCheckedState(checkForPillar); //now ids are in checked state
      });
    }
  }, [questId]);

  const handleOnChange = (position) => {
    const copyOfCheckedState = [...checkedState];
    const valued = parseInt(position.target.value);
    if (checkedState.includes(valued)) {
      copyOfCheckedState.splice(checkedState.indexOf(valued), 1);
    } else {
      copyOfCheckedState.push(valued);
    }

    setCheckedState(copyOfCheckedState);
  };

  const addQuest = (evt) => {
    const newQuest = {
      quest_title: title,
      quest_objective: objective,
      user: userId,
      completed: false,
      pillars: checkedState,
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(newQuest),
    };

    fetch(`http://localhost:8000/quests`, fetchOptions)
      .then((response) => response.json())
      .then(() => history.push("/quests"));
  };

  return (
    <div>
      <form
        onChange={(evt) => {
           const copy = {...currentQuest}
            copy.quest_title = evt.target.value
          setCurrentQuest(copy);
        }}
      >
        <input
          type="text"
          id="quest_title"
          size="50"
          value={currentQuest.quest_title}
        />
      </form>
      <form
        onChange={(evt) => {
            const copy = {...currentQuest}
            copy.quest_objective = evt.target.value
          setCurrentQuest(copy);
        }}
      >
        <input
          type="text"
          id="quest_objective"
          size="50"
          value={currentQuest.quest_objective}
        />
      </form>
      <ul className="pillars-list">
        {pillars.map(({ label, id }, index) => {
          return (
            <li key={index}>
              <div className="pillars-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    checked={checkedState.includes(id)}
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
        onClick={(e) => {
          e.preventDefault();
          //add the checked state to current meeting here
          const completeQuestData = {
            ...currentQuest,
            pillars: checkedState,
          };
          questId
            ? editQuest(completeQuestData).then(() => history.push("/quests"))
            : createQuest(completeQuestData).then(() =>
                history.push("/quests")
              );
        }}
      >
        Save Quest
      </button>
    </div>
  );
};
