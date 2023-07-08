import React, { useContext, useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import MovieContext from "../../../store/movie-context";

// movie detail use in list of category movies, and searched movies
const MovieDetail = (props) => {
  const ctx = useContext(MovieContext);

  const [mediaLink, setMediaLink] = useState("backdrop");

  useEffect(() => {
    (async () => {
      // fetch data about movie according to movie ID from parent
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=${ctx.apiKey}`
      );
      const data = await result.json();

      // if found videos about the movie
      if (data.results) {
        const trailers = data.results.find((video) => video.type === "Trailer");
        const teasers = data.results.find((video) => video.type === "Teaser");

        // if there is trailer, use trailer, else use teaser, if there is no teaser, use backdrop
        trailers && setMediaLink(trailers.key);
        !trailers && teasers && setMediaLink(teasers.key);
        !trailers && !teasers && setMediaLink("backdrop");
      } else setMediaLink("backdrop");
    })();
  }, [props.movie, ctx.apiKey]);

  let media;
  if (mediaLink === "backdrop")
    media = (
      <img
        src={`${ctx.imgUrl}${props.movie.backdrop_path}`}
        alt={props.movie.name ?? props.movie.title}
      />
    );
  else media = <iframe src={`https://www.youtube.com/embed/${mediaLink}`} />;

  return (
    <div className={styles["movie-detail"]}>
      <div className={styles.description}>
        <h3>{props.movie.title ?? props.movie.name}</h3>
        <p className={styles["release-date"]}>
          Release Date: {props.movie.release_date ?? props.movie.first_air_date}
        </p>
        <p className={styles.vote}>Vote: {props.movie.vote_average} / 10</p>
        <p className={styles.content}>{props.movie.overview}</p>
      </div>
      {media}
    </div>
  );
};

export default MovieDetail;
