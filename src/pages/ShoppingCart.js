import React from 'react';
import { arrayOf, shape } from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { cartItems } = this.props;

    return (
      <div>
        { cartItems.length === 0
          ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
          : cartItems.map(({ id, title, price, quantity }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{ title }</p>
              <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
              <p>{ price }</p>
            </div>
          ))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartItems: arrayOf(shape({})).isRequired,
};

export default ShoppingCart;
