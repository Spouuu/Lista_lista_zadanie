type Dict = {
  [key: number]: number;
};

export interface MovieProps {
  id: number;
  title: string;
  year: number;
  genre: string;
  addToWatched: (id: number) => void;
  watchedList: number[];
  listaOcen: Dict;
  setRating: (id: number, rating: number) => void;
}

export const MovieCard = (props: MovieProps) => {
  const currentRating = props.listaOcen[props.id] ?? 0;

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
        {props.watchedList.includes(props.id)
          ? "Obejrzane"
          : "Nie Obejrzane"}
      </button>

      <p>Ocena: {currentRating || "brak"}</p>

      <div>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => props.setRating(props.id, rating)}
          >
            {rating <= currentRating ? "❤︎" : "♡"}
          </button>
        ))}
      </div>
    </div>
  );
};
