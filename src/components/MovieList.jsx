import React, { useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieItem from "./MovieItem";
import { Box, CircularProgress } from "@mui/material";
import { TextFields } from "@mui/icons-material";

const MovieList = () => {
  const { movies, getMovies } = useMovieContext();
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "space-evenly",
        mt: 5,
      }}
    >
      {movies.length > 0 ? (
        movies.map((item) => <MovieItem key={item.id} item={item} />)
      ) : (
        <CircularProgress
          sx={{ mx: "auto", mt: 4, display: "block" }}
          size={150}
        />
      )}
    </Box>
  );
};

export default MovieList;
