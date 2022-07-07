import React from 'react';
import { getProducts } from '../services/api';

class SearchInput extends React.Component {
  constructor() {
    super();

    this.productFetcher = this.productFetcher.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);

    this.state = {
      products: [],
      searchInput: '',
    }
  }

  componentDidMount() {
    this.productFetcher();
  }

  async productFetcher() {
    const listOfProducts = await getProducts();
    this.setState({
      products: [...listOfProducts],
    });
  }

  handleSubmitButton() {
// pegar o searchInput (não pode ser pq a função teria duas funções)
// fazer a requisição
  }

  render() {
    const { products, searchInput } = this.state;

    return (
      <form>
        <input
          type="text"
          data-testid="query-input"
          value={ searchInput }
        />
        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.handleSubmitButton }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default SearchInput;
