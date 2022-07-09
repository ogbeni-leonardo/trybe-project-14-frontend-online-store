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

    this.cartSizeUpdate = this.cartSizeUpdate.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);

    this.state = {
      cartSize: this.getQuantityOfProductsOfCart(),
      fetchSuccess: true,
      loading: false,
      productsList: [],
    };
  }

  componentDidMount() { this.cartSizeUpdate(); }

  getQuantityOfProductsOfCart() {
    const allSavedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    /* Caso o localStorage já tenha sido inicializado prossiga... */
    if (allSavedCartItems) {
      /* Retorne a quantidade total de itens no carrinho. */
      return allSavedCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    }
    /* Caso não tenha sido inicializado retorne 0.  */
    return 0;
  }

  /* O objetivo desta função é atualizar a contagem de itens no carrinho. */
  cartSizeUpdate() {
    const cartSize = this.getQuantityOfProductsOfCart();
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
    const { addProductToCart } = this.props;

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

Home.propTypes = {
  addProductToCart: func.isRequired,
};

export default Home;
