import React, { useState } from "react";
import Header from ".././browse/Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import styles from "./Search.module.css";
import MovieList from ".././browse/MovieList/MovieList";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);

  // function to get search result from child component SearchForm
  const getSearchResult = (result) => setSearchResult(result);

  // render search result as rows of 9 movies each, each row is a MovieList component
  let movieList = [],
    numRow,
    rangeStart = 0,
    rangeEnd = 9;

  if (searchResult.length % 9 === 0) numRow = searchResult.length / 9;
  else numRow = Math.floor(searchResult.length / 9) + 1;

  for (let i = 0; i < numRow; i++) {
    movieList.push(
      <MovieList
        className={styles["list-result"]}
        key={i}
        movies={searchResult.slice(rangeStart, rangeEnd)}
        listType="search"
      />
    );

    rangeStart += 9;
    rangeEnd += 9;
  }

  return (
    <div className={styles.search}>
      <Header />
      <SearchForm getSearchResult={getSearchResult} />
      <h3>Search Result</h3>
      {/* if there is no result, render a message, else render the results */}
      {searchResult.length === 0 ? <p>No result found.</p> : movieList}
    </div>
  );
};

export default Search;
