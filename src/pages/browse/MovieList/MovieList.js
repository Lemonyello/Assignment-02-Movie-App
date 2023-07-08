import React, { Fragment, useContext, useEffect, useRef } from "react";
import styles from "./MovieList.module.css";
import MovieContext from "../../../store/movie-context";
import MovieDetail from "../MovieDetail/MovieDetail";
import useNoAnim from "../../../hooks/use-no-anim";
import useShowMovie from "../../../hooks/use-show-movie";

// list of movies for original movies, different movie categories, search movies

const MovieList = (props) => {
  const ctx = useContext(MovieContext);

  const { movieList, setMovieList, showMovie, onImgClickHandler } =
    useShowMovie();

  const listRef = useRef();

  // prevents image animation (scale image up) from running when page loads
  const noAnim = useNoAnim();

  useEffect(() => {
    (async () => {
      // if list type is search, do not fetch movies from API, just take movie list from parent
      if (props.listType === "search") {
        setMovieList(props.movies);
        return;
      }

      const result = await fetch(props.url);
      const data = await result.json();

      // if list type is not original or search
      if (props.listType === undefined) setMovieList(data.results);
      // if list type is original, get 9 first movies
      else if (props.listType === "original")
        setMovieList(data.results.slice(0, 9));
    })();
  }, [props.url, setMovieList, props.listType, props.movies]);

  useEffect(() => {
    // add event scroll horizontal for list
    const list = listRef.current;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      list.scrollTo({
        left: list.scrollLeft + e.deltaY * 2,
        behavior: "smooth",
      });
    };

    list.addEventListener("wheel", onWheel);

    return () => list.removeEventListener("wheel", onWheel);
  }, []);

  // if list type is original or search, style the list as poster image, else style the list as backdrop
  const movieListClasses =
    props.listType === "original" || props.listType === "search"
      ? styles["movie-list-original"]
      : styles["movie-list"];

  return (
    <Fragment>
      <div ref={listRef} className={movieListClasses}>
        {movieList.map((movie) => (
          <img
            className={noAnim ? styles["no-anim"] : ""}
            key={movie.id}
            src={
              // if list type is original or search, show poster as image, else show backdrop as image

              props.listType === "original" || props.listType === "search"
                ? `${ctx.imgUrl}${movie.poster_path}`
                : `${ctx.imgUrl}${movie.backdrop_path}`
            }
            alt={movie.title ?? movie.name}
            onClick={onImgClickHandler}
            data-id={movie.id}
          />
        ))}
      </div>
      {/* show movie detail if user has clicked a movie */}
      {showMovie.showDetail ? (
        <MovieDetail movie={showMovie.currentMovie} />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default MovieList;
