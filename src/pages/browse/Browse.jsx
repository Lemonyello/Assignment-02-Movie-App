import React, { useContext } from "react";
import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import MovieContext from "../../store/movie-context";
import MovieList from "./MovieList/MovieList";
import styles from "./Browse.module.css";

function Browse() {
  const ctx = useContext(MovieContext);

  const requests = {
    fetchTrending: `/trending/all/week?api_key=${ctx.apiKey}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${ctx.apiKey}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${ctx.apiKey}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${ctx.apiKey}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${ctx.apiKey}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${ctx.apiKey}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${ctx.apiKey}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${ctx.apiKey}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${ctx.apiKey}&language=en-US`,
  };

  return (
    <div>
      <Header />
      <Banner />
      <div className={styles["movies"]}>
        <MovieList
          url={`${ctx.url}${requests.fetchNetflixOriginals}`}
          listType="original"
        />
        <h3>Xu hướng</h3>
        <MovieList url={`${ctx.url}${requests.fetchTrending}`} />
        <h3>Xếp hạng cao</h3>
        <MovieList url={`${ctx.url}${requests.fetchTopRated}`} />
        <h3>Hành động</h3>
        <MovieList url={`${ctx.url}${requests.fetchActionMovies}`} />
        <h3>Hài</h3>
        <MovieList url={`${ctx.url}${requests.fetchComedyMovies}`} />
        <h3>Kinh dị</h3>
        <MovieList url={`${ctx.url}${requests.fetchHorrorMovies}`} />
        <h3>Lãng mạn</h3>
        <MovieList url={`${ctx.url}${requests.fetchRomanceMovies}`} />
        <h3>Tài liệu</h3>
        <MovieList url={`${ctx.url}${requests.fetchDocumentaries}`} />
      </div>
    </div>
  );
}

export default Browse;
