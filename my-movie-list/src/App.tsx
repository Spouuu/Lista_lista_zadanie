import { useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import { MovieCard } from "./components/MovieCard";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

type Dict = {
  [key: number]: number;
};

function App() {
  const [movielist, setMovielist] = useState<Movie[]>(movies);

  const [watched, setWatched] = useState<number[]>([]);

  const [filter, setFilter] = useState<
    "all" | "watched" | "unwatched"
  >("all");

  const [listaocen, setListaocen] = useState<Dict>(() => {
    return movies.reduce((temp: Dict, item) => {
      temp[item.id] = 0;
      return temp;
    }, {});
  });

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const setRating = (id: number, rating: number) => {
    setListaocen((prev) => ({
      ...prev,
      [id]: rating,
    }));
  };

  const addToWatched = (id: number) => {
    if (watched.includes(id)) {
      setWatched(watched.filter((num) => num !== id));
    } else {
      setWatched([...watched, id]);
    }
  };

  const clearAllWatched = () => {
    setWatched([]);
  };

  const addMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !year || !genre) {
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title,
      year: Number(year),
      genre: genre,
    };

    setMovielist((prev) => [...prev, newMovie]);

    setListaocen((prev) => ({
      ...prev,
      [newMovie.id]: 0,
    }));

    setTitle("");
    setYear("");
    setGenre("");
  };

  const filteredMovies = movielist.filter((movie) => {
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

      <form onSubmit={addMovie}>
        <label>
          Tytuł:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <br />

        <label>
          Rok:
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>

        <br />

        <label>
          Gatunek:
          <input
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </label>

        <br />

        <button type="submit">Dodaj film</button>
      </form>

      <h1>
        {watched.length}/{movielist.length}
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
        filteredMovies.map((item) => (
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
        ))
      )}
    </div>
  );
}

export default App;
