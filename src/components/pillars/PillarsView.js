import React, { useEffect, useState } from "react";
import "./PillarView.css";
import { useHistory } from "react-router-dom";
import { GiSwordsEmblem, GiIonicColumn } from "react-icons/gi"
export const PillarView = () => {
  const [quests, setQuests] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchQuests();
  }, []);

  const fetchQuests = () => {
    return fetch(`https://pillar-quest.herokuapp.com/quests?completed`, {
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
      <div className="container pillars">
        <button
          className="hero button is-primary is-large is-fullwidth"
          onClick={() => {
            history.push({ pathname: "/quests" });
          }}
        >
          <div className="buttonFlex"><GiSwordsEmblem size="40"/><p>GO TO QUESTS</p> <GiSwordsEmblem size="40"/></div>
        </button>
        <div className="columns">
          <div className="column card">
            <h1><GiIonicColumn size="40"/>SPIRITUAL</h1>
            {quests.map((questObject) => {
              return questObject?.pillars.map((pillarObject) => {
                if (pillarObject?.label === "Spiritual") {
                  return (
                    <h2>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="2em"
                        width="2em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M261.78 18.063c-52.004 0-94.686 45.7-94.686 103.156 0 57.455 42.682 103.155 94.687 103.155 52.007 0 94.72-45.7 94.72-103.156 0-57.457-42.713-103.157-94.72-103.157zM203 159.655c13.276 3.67 26.394 6.046 39.375 7.22v18.75c-14.674-1.21-29.464-3.85-44.375-7.97l5-18zm117.375 0l4.906 18.03c-14.452 3.938-29.08 6.583-43.874 7.845v-18.718c13.085-1.223 26.055-3.638 38.97-7.156zM160.22 175.344c-75.308 50.797-110.604 125.208-116.282 220h.218c-.367 1.705-.562 3.466-.562 5.28 0 13.808 11.19 25 25 25 .22 0 .436-.025.656-.03v.22l179.438-.002V302.406c-25.58 4.82-45.22 28.49-45.22 62.594v9.344H103.096v-18.688h12.718c3.664-35.178 26.522-77.998 45.343-101.344l14.53 11.72c-15.618 19.373-36.603 61.664-40.905 89.624h50.47c4.04-42.08 35.168-72.875 73.22-72.875 34.98 0 68.653 28.958 73.905 72.876h55.75c-5.412-28.305-26.53-70.32-42.094-89.625l14.564-11.717c18.885 23.424 41.643 66.485 46.562 101.343h10.563v18.688H314.593l-.25-9.094c-1.02-35.656-23.57-58.234-46.97-62.875v123.438h180.657v-.22c.22.006.436.032.658.032 13.81 0 25-11.193 25-25 0-2.092-.266-4.12-.75-6.063-5.566-92.605-39.022-165.662-111.032-216.218-19.026 38.355-56.592 64.72-100.125 64.72-44.662 0-83.047-27.74-101.56-67.72zM140.374 444.5l9.188 47.5h220.562l8.47-47.5h-238.22z"></path>
                      </svg>
                      
                      {questObject?.quest_title}
                      
                    </h2>
                  );
                }
              });
            })}
          </div>
          <div className="column card">
            <h1><GiIonicColumn size="40"/>MENTAL</h1>
            {quests.map((questObject) => {
              return questObject?.pillars.map((pillarObject) => {
                if (pillarObject?.label === "Mental") {
                  return (
                    <h2>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="2em"
                        width="2em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path fill="none" d="M0 0H24V24H0z"></path>
                          <path d="M11 2c4.068 0 7.426 3.036 7.934 6.965l2.25 3.539c.148.233.118.58-.225.728L19 14.07V17c0 1.105-.895 2-2 2h-1.999L15 22H6v-3.694c0-1.18-.436-2.297-1.244-3.305C3.657 13.631 3 11.892 3 10c0-4.418 3.582-8 8-8zm-.53 5.763c-.684-.684-1.792-.684-2.475 0-.684.683-.684 1.791 0 2.474L11 13.243l3.005-3.006c.684-.683.684-1.791 0-2.474-.683-.684-1.791-.684-2.475 0l-.53.53-.53-.53z"></path>
                        </g>
                      </svg>
                      {questObject?.quest_title}
                    </h2>
                  );
                }
              });
            })}
          </div>
          <div className="column card">
            <h1><GiIonicColumn size="40"/>PHYSICAL</h1>
            {quests.map((questObject) => {
              return questObject?.pillars.map((pillarObject) => {
                if (pillarObject?.label === "Physical") {
                  return (
                    <h2>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="2em"
                        width="2em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M156.7 25.83L89 39.38c-.1 58.57-1.74 119.32-43.49 167.22C104.4 246.5 189 260.7 247 248.8v-99L108.3 88.22l7.4-16.44L256 134.2l140.3-62.42 7.4 16.44L265 149.8v99c58 11.9 142.6-2.3 201.5-42.2-41.8-47.9-43.4-108.65-43.5-167.22l-67.7-13.55c-12.9 13.88-20.6 28.15-32.9 40.53C308.9 79.78 289.5 89 256 89c-33.5 0-52.9-9.22-66.4-22.64-12.3-12.38-20-26.65-32.9-40.53zM53.88 232.9C75.96 281 96.07 336.6 102.7 392.8l65 22.8c4.2-52.7 28.2-104 63.7-146.1-55.1 6.3-122.7-5.8-177.52-36.6zm404.22 0c-54.8 30.8-122.4 42.9-177.5 36.6 35.5 42.1 59.5 93.4 63.7 146.1l65.2-22.9c6.6-56.8 26.6-111.8 48.6-159.8zM256 269c-40.5 43.1-67.7 97.9-70.7 152.7l61.7 21.6V336h18v107.3l61.7-21.6c-3.1-54.8-30.2-109.6-70.7-152.7zm151.7 143.4L297 451.1v18.8l110.2-44.1c.1-4.5.3-8.9.5-13.4zm-303.3.1c.3 4.5.4 8.9.5 13.4l110.1 44v-18.7l-110.6-38.7zM279 457.4l-23 8.1-23-8v19.6l23 9.2 23-9.2v-19.7z"></path>
                      </svg>
                      {questObject?.quest_title}
                    </h2>
                  );
                }
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
};
