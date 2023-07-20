import React, { createContext, useContext, useReducer, useState } from "react";
import { API, ACTION, LIMIT } from "../utils/consts";

import axios from "axios";
import { useSearchParams } from "react-router-dom";

const movieContext = createContext();
export function useMovieContext() {
  return useContext(movieContext);
}

const init = {
  movies: [],
  movie: null,
  pageTotalCount: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.movies:
      return { ...state, movies: action.payload };

    case ACTION.movie:
      return { ...state, movie: action.payload };
    case ACTION.pageTotalCount:
      return { ...state, pageTotalCount: action.payload };
    default:
      return state;
  }
}
const MovieContext = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, init);
  const [page, setPage] = useState(+searchParams.get("_page") || 1);

  async function getOneMovie(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);

      dispatch({
        type: ACTION.movie,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getMovies() {
    try {
      const { data, headers } = await axios(`${API}${window.location.search}`);
      const totalCount = Math.ceil(headers["x-total-count"] / LIMIT);

      dispatch({
        type: "pageTotalCount",
        payload: totalCount,
      });

      dispatch({
        type: ACTION.movies,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function editMovie(id, obj) {
    try {
      await axios.patch(`${API}/${id}`, obj);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteMovie(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getMovies();
    } catch (e) {
      console.log(e);
    }
  }
  async function addMovie(obj) {
    try {
      await axios.post(API, obj);
    } catch (e) {
      console.log(e);
    }
  }
  async function sortByRating(checked) {
    try {
      if (checked === true) {
        const { data } = await axios(API);
        const res = data.sort((a, b) => b.rating - a.rating);
        dispatch({
          type: ACTION.movies,
          payload: res,
        });
      } else {
        getMovies();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    movies: state.movies,
    movie: state.movie,

    searchParams,
    setSearchParams,

    pageTotalCount: state.pageTotalCount,
    page,

    addMovie,
    deleteMovie,
    getOneMovie,
    editMovie,
    getMovies,
    sortByRating,
    setPage,
  };

  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
