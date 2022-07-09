import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { number } from 'prop-types';

import './ShoppingCartButton.css';

class ShoppingCartButton extends Component {
  render() {
    const { cartSize } = this.props;

    return (
      <Link
        className="cartLink"
        data-testid="shopping-cart-button"
        to="/shopping-cart"
      >
        <i className="fa-solid fa-cart-shopping" />
        <span data-testid="shopping-cart-size">{ cartSize }</span>
      </Link>
    );
  }
}

ShoppingCartButton.propTypes = {
  cartSize: number.isRequired,
};

export default ShoppingCartButton;
