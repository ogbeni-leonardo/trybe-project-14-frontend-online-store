import React from 'react';

import { getProductsFromCategoryAndQuery } from '../services/api';

import CategorySideBar from '../components/CategorySideBar';
import SearchInput from '../components/SearchInput';
import ShoppingCartButton from '../components/ShoppingCartButton';
import ProductCard from '../components/ProductCard';

class Home extends React.Component {
  constructor() {
    super();

    this.fetchProducts = this.fetchProducts.bind(this);

    this.state = {
      productsList: [],
      fetchSuccess: true,
    };
  }

  async fetchProducts(id, query) {
    const products = await getProductsFromCategoryAndQuery(id, query);

    this.setState({
      productsList: [...products.results],
      fetchSuccess: products.results.length > 0,
    });
  }

  render() {
    const { productsList, fetchSuccess } = this.state;

    return (
      <div>
        <CategorySideBar />
        <SearchInput fetchProducts={ this.fetchProducts } />
        <ShoppingCartButton />

        { fetchSuccess && productsList.length === 0
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}

        { !fetchSuccess && <p>Nenhum produto foi encontrado</p> }

        <ul>
          { productsList.map((product) => (
            <ProductCard key={ product.id } product={ product } />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
