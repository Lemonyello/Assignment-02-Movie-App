import { useReducer, useState } from "react";

const showMovieReducer = (state, action) => {
  // when user click a movie currently showing detail => hide the detail, set current movie to empty
  if (action.type === "close movie")
    return {
      showDetail: false,
      currentMovie: "",
    };

  // when user click a movie not currently showing detail => show the detail, set current movie to that movie
  if (action.type === "show movie")
    return {
      showDetail: true,
      currentMovie: action.movieList.find(
        (movie) => movie.id === Number(action.currentMovieId)
      ),
    };
};

// this hook provides movielist state, handler for when user click a movie, state to control if we should show detail of a movie or not
const useShowMovie = () => {
  const [movieList, setMovieList] = useState([]);

  const [showMovie, dispatchShowMovie] = useReducer(showMovieReducer, {
    currentMovie: "",
    showDetail: false,
  });

  const onImgClickHandler = (e) => {
    if (Number(e.target.dataset.id) !== showMovie.currentMovie.id) {
      dispatchShowMovie({
        type: "show movie",
        currentMovieId: e.target.dataset.id,
        movieList: movieList,
      });
    }

    if (Number(e.target.dataset.id) === showMovie.currentMovie.id) {
      dispatchShowMovie({ type: "close movie" });
    }
  };

  return {
    movieList,
    setMovieList,
    showMovie,
    dispatchShowMovie,
    onImgClickHandler,
  };
};

export default useShowMovie;
