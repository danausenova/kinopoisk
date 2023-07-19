import React, { createContext, useContext, useReducer } from "react";
import { API, ACTION } from "../utils/consts";
import axios from "axios";

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
      const { data } = await axios(API);
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

  const value = {
     movies: state.movies,
    movie: state.movie,
    addMovie,
    deleteMovie,
    getOneMovie,
    editMovie,
    getMovies,

  };

  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
