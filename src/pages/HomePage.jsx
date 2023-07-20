import React, { useEffect } from "react";
import MovieList from "../components/MovieList";
import Filter from "../components/Filter";
import { useMovieContext } from "../context/MovieContext";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const { getMovies } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getMovies();
  }, [searchParams]);
  return (
    <div>
      <Filter />
      <MovieList />
    </div>
  );
};

export default HomePage;
