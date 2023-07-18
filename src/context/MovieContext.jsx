import React, { createContext, useContext } from "react";

const movieContext = createContext();
export function useMovieContext() {
  return useContext(movieContext);
}
const MovieContext = ({ children }) => {
  const value = {};
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
