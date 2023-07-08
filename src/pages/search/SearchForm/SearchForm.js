import React, { useContext, useRef } from "react";
import styles from "./SearchForm.module.css";
import MovieContext from "../../../store/movie-context";

// search form in search page
const SearchForm = (props) => {
  const ctx = useContext(MovieContext);

  const inputQueryRef = useRef();

  // when click btn Reset
  const onResetHandler = (e) => {
    e.preventDefault();

    // clear search input and searched list
    inputQueryRef.current.value = "";
    props.getSearchResult([]);
  };

  // when click btn Search
  const onSearchHandler = (e) => {
    e.preventDefault();
    if (inputQueryRef.current.value.trim())
      (async () => {
        const result = await fetch(
          `${ctx.searchUrl}api_key=${ctx.apiKey}&query=${inputQueryRef.current.value}`
        );
        const data = await result.json();

        // transfer the search result to parent
        props.getSearchResult(data.results);
      })();
    // if input search is empty, alert a message
    else alert("Please type in a search keyword.");
  };

  return (
    <form className={styles["search-form"]}>
      <input type="text" ref={inputQueryRef} />
      <svg
        className={`${styles["search-icon"]} svg-inline--fa fa-search fa-w-16`}
        fill="#ccc"
        aria-hidden="true"
        data-prefix="fas"
        data-icon="search"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
      </svg>
      <div className={styles.buttons}>
        <button className={styles["secondary-btn"]} onClick={onResetHandler}>
          Reset
        </button>
        <button className={styles["primary-btn"]} onClick={onSearchHandler}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
