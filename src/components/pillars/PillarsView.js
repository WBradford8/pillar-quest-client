import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const PillarView = () => {
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        fetchQuests();
      }, []);
    
      const fetchQuests = () => {
        return fetch(`http://localhost:8000/quests?completed`, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
          },
        })
          .then((res) => res.json())
          .then((postArray) => setQuests(postArray));
      };


    return (
        <>
            <div>
                <h1>SPIRITUAL</h1>
                {quests.map((questObject) => {
                    return questObject?.pillars.map(
                        (pillarObject) => {
                            if (pillarObject?.label === "Spiritual") {
                                return <h2>{questObject?.quest_title}</h2>
                            }
                            
                        }
                    )
                })}
            </div>
            <div>
                <h1>MENTAL</h1>
                {quests.map((questObject) => {
                    return questObject?.pillars.map(
                        (pillarObject) => {
                            if (pillarObject?.label === "Mental") {
                                return <h2>{questObject?.quest_title}</h2>
                            }
                            
                        }
                    )
                })}
            </div>
            <div>
                <h1>PHYSICAL</h1>
                {quests.map((questObject) => {
                    return questObject?.pillars.map(
                        (pillarObject) => {
                            if (pillarObject?.label === "Physical") {
                                return <h2>{questObject?.quest_title}</h2>
                            }
                            
                        }
                    )
                })}
            </div>
        </>
    )

 
    





















};