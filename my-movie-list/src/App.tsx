import { useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import { MovieCard } from "./components/MovieCard";

type dict = {
  [key: number]:number
}

function App() {
  const [watched, setWatched] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "watched" | "unwatched">("all");
  

  const [listaocen, setListaocen] = useState<dict>(() => {
  return movies.reduce((temp: dict, item) => {
    temp[item.id] = 0;
    return temp;
  }, {});
  });

  const setRating = (id: number, rating: number) => {
  setListaocen({
    ...listaocen,
    [id]: rating,
  });
  };



  const addToWatched = (id: number) => {
    let temp: number[] = [];

    if (watched.includes(id)) {
      temp = watched.filter((num) => num !== id);
    } else {
      temp = [...watched, id];
    }

    setWatched(temp);
  };

  const clearAllWatched = () => {
    setWatched([]);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watched.includes(movie.id);
    }

    if (filter === "unwatched") {
      return !watched.includes(movie.id);
    }

    return true;
  });

  return (
    <div>
      <mark>Hey, it's me, it's Verity</mark>

      <h1>
        {watched.length}/{movies.length}
      </h1>

      <button onClick={() => setFilter("all")}>
        Wszystkie
      </button>

      <button onClick={() => setFilter("watched")}>
        Obejrzane
      </button>

      <button onClick={() => setFilter("unwatched")}>
        Nieobejrzane
      </button>

      <button onClick={clearAllWatched}>
        Wyczyść wszystkie
      </button>

      {filteredMovies.length === 0 ? (
        <p>Lista jest pusta.</p>
      ) : (
        filteredMovies.map((item) => {
          return (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              year={item.year}
              genre={item.genre}
              addToWatched={addToWatched}
              watchedList={watched}
              listaOcen={listaocen}
              setRating={setRating}
            />

          );
        })
      )}
    </div>
  );
}

export default App;
