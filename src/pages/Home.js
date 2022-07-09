import React from 'react';
import { func } from 'prop-types';

import { getProductsFromCategoryAndQuery } from '../services/api';

import Header from '../components/Header';
import CategorySideBar from '../components/CategorySideBar';
import SearchInput from '../components/SearchInput';
import ProductCard from '../components/ProductCard';

import '../css/Home.css';
import spinner from '../images/spinner.gif';

class Home extends React.Component {
  constructor() {
    super();

    this.cartCounterUpdate = this.cartCounterUpdate.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);

    this.state = {
      cartCounter: 0,
      fetchSuccess: true,
      loading: false,
      productsList: [],
    };
  }

  componentDidMount() { this.cartCounterUpdate(); }

  /* O objetivo desta função é atualizar a contagem de itens no carrinho. Ela será passada
  para o componente Header que então passará para o componente ShoppingCartButton. */
  cartCounterUpdate() {
    const allSavedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    /* Se o localStorage ainda não tiver inicializado apenas ignore, caso o contrário mude o estado. */
    if (allSavedCartItems) {
      this.setState({ cartCounter: allSavedCartItems.length });
    }
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
    const { productsList, fetchSuccess, loading, cartCounter } = this.state;
    const { addProductToCart } = this.props;

    return (
      <div>
        <Header cartCounter={ cartCounter } />

        <div className="homePage">
          <CategorySideBar fetchProducts={ this.fetchProducts } />

          <div className="homePageContent">
            <SearchInput fetchProducts={ this.fetchProducts } />

            {/* Esta mensagem aparecerá enquanto a requisição estiver sendo feita */}
            { loading && (
              <div className="homePageLoadingContainer">
                <img alt="loading" src={ spinner } className="homePageLoading" />
                <p>Carregando...</p>
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
                  addProductToCart={ addProductToCart }
                  cartCounterUpdate={ this.cartCounterUpdate }
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

Home.propTypes = {
  addProductToCart: func.isRequired,
};

export default Home;
