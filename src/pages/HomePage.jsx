import React, { useEffect } from "react";
import MovieList from "../components/MovieList";
import { Box, Pagination } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../utils/consts";

const HomePage = () => {
  const { page, pageTotalCount, setPage, getMovies } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    getMovies();
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      _page: page,
      _limit: LIMIT,
    });
    console.log(currentParams);
  }, [page]);

  return (
    <div>
      <MovieList />;
      <Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
        <Pagination
          count={pageTotalCount}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
        />
      </Box>
      ;
    </div>
  );
};

export default HomePage;
