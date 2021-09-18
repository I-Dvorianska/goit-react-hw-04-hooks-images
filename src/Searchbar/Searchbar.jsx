import {useState } from "react";
import './Searchbar.css';
import PropTypes from 'prop-types';


function Searchbar ({onSubmit}) {
  const [search, setSearch] = useState('');

const getSearchText = (e) => {
  setSearch(e.currentTarget.value.trim());
  };

const onSearchBtnClick = (e) => {
  e.preventDefault();
  onSubmit(search);
  }
  
  return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSearchBtnClick}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={getSearchText}
            className="SearchForm-input"
            type="text"
            value={search}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}

export default Searchbar;
