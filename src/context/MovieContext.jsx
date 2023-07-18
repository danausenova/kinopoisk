import axios from "axios";
import React, { createContext, useContext } from "react";
import { API } from "../utils/consts.js";

const movieContext = createContext();
export function useMovieContext() {
  return useContext(movieContext);
}

async function deleteMovie(id) {
  try {
    await axios.delete(`${API}/${id}`);
  } catch (e) {
    console.log(e);
  }
}

const MovieContext = ({ children }) => {
  const value = {
    deleteMovie,
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
