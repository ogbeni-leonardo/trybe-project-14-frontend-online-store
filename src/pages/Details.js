import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
import { getProductsById } from '../services/api';

import Header from '../components/Header';
import EvaluationForm from '../components/EvaluationForm';

class Details extends Component {
  constructor() {
    super();

    this.cartSizeUpdate = this.cartSizeUpdate.bind(this);

    this.state = {
      cartSize: this.getQuantityOfProductsOfCart(),
      product: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const product = await getProductsById(id);
    this.setState({ product });
  }

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

  render() {
    const { cartSize, product } = this.state;
    const { addProductToCart, match: { params: { id } } } = this.props;

    return (
      <div>
        <Header cartSize={ cartSize } />

        { [product].map(({ title, thumbnail, price }, index) => (
          <div key={ index }>
            <h2 data-testid="product-detail-name">{ title }</h2>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ () => {
                addProductToCart(product);
                this.cartSizeUpdate();
              } }
            >
              Adicionar ao carrinho
            </button>
          </div>
        )) }

        <EvaluationForm productID={ id } />
      </div>
    );
  }
}

Details.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
  addProductToCart: func.isRequired,
};

export default Details;
