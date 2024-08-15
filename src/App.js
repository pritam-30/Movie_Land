import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard.jsx";
const API_URL = "http://www.omdbapi.com?apikey=603777b0 " + "&t=";

// const movie_1 = {
//   Title: "M*A*S*H",
//   Year: "1970",
//   Rated: "R",
//   Type: "movie",
//   Released: "18 Mar 1970",
//   Runtime: "116 min",
//   Genre: "Comedy, Drama, War",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BYTMzY2UwODktMjFiZC00NzUxLWE1M2ItOTg0YTAxMTgwMTEzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
// };

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search query as the user types
        />
        <img
          src={SearchIcon}
          alt="search"
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      ) : (
        <p style={{ color: "red" }}>
          No movies found. Please try searching for something else.
        </p>
      )}
    </div>
  );
};
export default App;
