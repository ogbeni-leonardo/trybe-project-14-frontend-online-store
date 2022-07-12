import React from 'react';

import { getProductsFromCategoryAndQuery } from '../services/api';
import { getQuantityOfProductsOfCart } from '../js/localStorageFunctions';

import Header from '../components/Header';
import CategorySideBar from '../components/CategorySideBar';
import SearchInput from '../components/SearchInput';
import ProductCard from '../components/ProductCard';

import '../css/Home.css';
import spinner from '../images/spinner.gif';

class Home extends React.Component {
  constructor() {
    super();

    this.cartSizeUpdate = this.cartSizeUpdate.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);

    this.state = {
      loading: false,
      fetchSuccess: true,
      productsList: [],
      cartSize: getQuantityOfProductsOfCart(),
    };
  }

  cartSizeUpdate() {
    const cartSize = getQuantityOfProductsOfCart();
    this.setState({ cartSize });
  }

  /* Esta função vai fazer a requisição dos produtos à API. Enquanto realiza esta função
  uma imagem e mensagem de carregamento será exibida. Logo que a requisição estiver completa
  essa imagem e mensagem será removida, dando lugar aos produtos retornados. */
  async fetchProducts(id, query) {
    this.setState(
      { loading: true, productsList: [] },
      async () => {
        const products = await getProductsFromCategoryAndQuery(id, query);
        this.setState({
          productsList: [...products.results],
          fetchSuccess: products.results.length > 0,
          loading: false,
        });
      },
    );
  }

  render() {
    const { productsList, fetchSuccess, loading, cartSize } = this.state;

    return (
      <div>
        <Header cartSize={ cartSize } />

        <div className="homePage">
          <CategorySideBar fetchProducts={ this.fetchProducts } />

          <div className="homePageContent">
            <SearchInput fetchProducts={ this.fetchProducts } />

            {/* Esta mensagem aparecerá enquanto a requisição estiver sendo feita */}
            { loading && (
              <div className="homePageLoadingContainer">
                <img alt="loading" src={ spinner } className="homePageLoading" />
              </div>
            ) }

            {/* Se não foi realizada nenhuma requisição e se não estiver carregando
            exiba essa mensagem */}
            { fetchSuccess && productsList.length === 0 && !loading
              && (
                <p className="homePageMessage" data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              )}

            {/* Caso uma requisição tenha sido feita, mas não houve retorno seja
            exibida essa mensagem */}
            { !fetchSuccess && (
              <p className="homePageMessage">Nenhum produto foi encontrado.</p>
            ) }

            {/* Renderize cada elemento da lista dos produtos encontrados */}
            <ul className="searchedProductsList">
              { productsList.map((product) => (
                <ProductCard
                  cartSizeUpdate={ this.cartSizeUpdate }
                  key={ product.id }
                  product={ product }
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
