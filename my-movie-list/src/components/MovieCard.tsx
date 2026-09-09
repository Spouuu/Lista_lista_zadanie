import { useState } from "react";

export interface movieprops {
  id: number;
  title: string;
  year: number;
  genre: string;
  addToWatched: CallableFunction;
  watchedList: number[];
}

export const MovieCard = (props: movieprops) => {
  const [obejrzane, setObjerzane] = useState(false);
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.year}</h3>
      <h4>{props.genre}</h4>
      <button
        onClick={() => {
          props.addToWatched(props.id);
        }}
      >
        {props.watchedList.includes(props.id) ? "Obejrzane" : "Nie Obejrzane"}
      </button>
    </div>
  );
};
