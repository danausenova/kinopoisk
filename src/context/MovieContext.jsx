import React, { createContext, useContext, useReducer } from "react";
import { API, ACTION } from "../utils/consts";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const movieContext = createContext();
export function useMovieContext() {
  return useContext(movieContext);
}

const init = {
  movies: [],
  movie: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.movies:
      return { ...state, movies: action.payload };

    case ACTION.movie:
      return { ...state, movie: action.payload };

    default:
      return state;
  }
}
const MovieContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  const [searchParams, setSearchParams] = useSearchParams();

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
      const { data } = await axios(`${API}${window.location.search}`);
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
    addMovie,
    deleteMovie,
    getOneMovie,
    editMovie,
    getMovies,
    sortByRating,
  };

  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
