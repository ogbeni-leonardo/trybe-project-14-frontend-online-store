import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
import { getProductsById } from '../services/api';

import Header from '../components/Header';

class Details extends Component {
  constructor() {
    super();

    this.cartCounterUpdate = this.cartCounterUpdate.bind(this);

    this.state = {
      cartCounter: 0,
      product: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const product = await getProductsById(id);
    this.setState({ product });
    this.cartCounterUpdate();
  }

  /* O objetivo desta função é atualizar a contagem de itens no carrinho. Ela será passada
  para o componente Header que então passará para o componente ShoppingCartButton.
  Esta função é exatamente igual a encontrada no componente Home. */
  cartCounterUpdate() {
    const allSavedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    /* Se o localStorage ainda não tiver inicializado apenas ignore, caso o contrário mude o estado. */
    if (allSavedCartItems) {
      this.setState({ cartCounter: allSavedCartItems.length });
    }
  }

  render() {
    const { cartCounter, product } = this.state;
    const { addProductToCart } = this.props;

    return (
      <div>
        <Header cartCounter={ cartCounter } />

        { product.map(({ title, thumbnail, price }, index) => (
          <div key={ index }>
            <h2 data-testid="product-detail-name">{ title }</h2>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ () => {
                addProductToCart(product[0]);
                this.cartCounterUpdate();
              } }
            >
              Adicionar ao carrinho
            </button>
          </div>
        )) }
      </div>
    );
  }
}

Details.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
  addProductToCart: func.isRequired,
};

export default Details;
