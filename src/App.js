import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://crudcrud.com/api/278337fa3a2a4a058f3c0d1e97ede6d8/moviesData"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.map((movieData) => {
        return {
          id: movieData._id,
          title: movieData.title,
          openingText: movieData.openingText,
          releaseDate: movieData.releaseDate,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://crudcrud.com/api/278337fa3a2a4a058f3c0d1e97ede6d8/moviesData",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong while sending data!");
      }
      const data = await response.json();
      console.log("data Added", data);
      fetchMoviesHandler();
    } catch (error) {
      console.log("Error while sending data", error);
    }
  };

  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/278337fa3a2a4a058f3c0d1e97ede6d8/moviesData/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(`Movie with _id ${id} deleted successfully.`);
      fetchMoviesHandler();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} deletMovei={deleteMovieHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
