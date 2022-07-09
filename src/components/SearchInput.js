import React, { Component } from 'react';
import { func } from 'prop-types';

import './SearchInput.css';

class SearchInput extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { searchInput: '' };
  }

  onInputChange({ target: { value } }) {
    this.setState({ searchInput: value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { searchInput } = this.state;
    const { fetchProducts } = this.props;
    fetchProducts('', searchInput.trim());
  }

  render() {
    const { searchInput } = this.state;

    return (
      <form className="searchForm">
        <div className="searchInputContainer">
          <input
            className="searchInput"
            data-testid="query-input"
            onChange={ this.onInputChange }
            placeholder="Digite o nome do produto..."
            type="text"
            value={ searchInput }
          />

          <button
            className="searchButton"
            data-testid="query-button"
            onClick={ this.onSubmit }
            type="submit"
          >
            Pesquisar
          </button>
        </div>
      </form>
    );
  }
}

SearchInput.propTypes = {
  fetchProducts: func.isRequired,
};

export default SearchInput;
