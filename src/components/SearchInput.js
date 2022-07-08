import React, { Component } from 'react';
import { func } from 'prop-types';

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
      <form>
        <input
          type="text"
          data-testid="query-input"
          value={ searchInput }
          onChange={ this.onInputChange }
        />

        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.onSubmit }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

SearchInput.propTypes = {
  fetchProducts: func.isRequired,
};

export default SearchInput;
