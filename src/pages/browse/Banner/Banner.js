import React, { useContext, useEffect, useState } from "react";
import styles from "./Banner.module.css";
import MovieContext from "../../../store/movie-context";

// banner show detail about a random highlighted movie in page browse
const Banner = () => {
  const ctx = useContext(MovieContext);
  const [bannerData, setBannerData] = useState({});

  useEffect(() => {
    (async () => {
      const result = await fetch(
        `${ctx.url}/discover/tv?api_key=${ctx.apiKey}&with_network=12`
      );
      const data = await result.json();
      // get a random movie in the fetched result
      const movie =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setBannerData(movie);
    })();
  }, [ctx.apiKey, ctx.url]);

  return (
    <div className={styles.banner}>
      <img
        // if there is no backdrop_path or movie name in the result, use poster_path and movie title instead
        src={`https://image.tmdb.org/t/p/w1280/${
          bannerData.backdrop_path ?? bannerData.poster_path
        }`}
        alt={bannerData.name ?? bannerData.title}
      />
      <div className={styles["banner-text"]}>
        <h3>{bannerData.name ?? bannerData.title}</h3>
        <div className={styles.buttons}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p className={styles.description}>{bannerData.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
