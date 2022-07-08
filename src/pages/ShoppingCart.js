import React from 'react';
import { arrayOf, shape } from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.map(({ id, title, price, quantify }) => (
          <div key={ id }>
            <p data-testid="shopping-cart-product-name">{ title }</p>
            <p data-testid="shopping-cart-product-quantity">{ quantify }</p>
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
