import React from "react";
import MovieContext from "./movie-context";

const MovieContextProvider = (props) => {
  return (
    <MovieContext.Provider
      value={{
        url: "https://api.themoviedb.org/3/",
        imgUrl: "https://image.tmdb.org/t/p/w500/",
        apiKey: "05d8a29b030467b18741809bdfe999cc",
        searchUrl: "https://api.themoviedb.org/3/search/movie?language=en-US&",
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
