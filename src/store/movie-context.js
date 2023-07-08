import React from "react";

const MovieContext = React.createContext({
  url: "",
  imgUrl: "",
  apiKey: "",
  searchUrl: "",
});

export default MovieContext;
