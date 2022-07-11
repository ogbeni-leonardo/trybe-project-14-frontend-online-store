import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';

import { addProductToCart } from '../js/localStorageFunctions';

import './CartItem.css';

class CartItem extends Component {
  constructor() {
    super();

    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
  }

  decreaseQuantity(product, quantity) {
    const { updateCartItems } = this.props;

    if (quantity > 1) {
      addProductToCart(product, quantity - 1);
      updateCartItems();
    }
  }

  increaseQuantity(product, quantity) {
    const { updateCartItems } = this.props;

    if (quantity < product.available_quantity) {
      addProductToCart(product, quantity + 1);
      updateCartItems();
    }
  }

  render() {
    const { product } = this.props;

    return (
      <li className="cartItem">
        <img className="cartItemImage" src={ product.thumbnail } alt={ product.title } />
        <div className="cartItemTitleContainer">
          <p
            className="cartItemTitle"
            data-testid="shopping-cart-product-name"
          >
            { product.title }
          </p>
          <p className="cartItemPrice">{ product.price }</p>
        </div>
        <div className="increaseAndDecrease">
          <button
            className="decrease"
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ () => this.decreaseQuantity(product, product.quantity) }
          >
            <i className="fa-solid fa-minus" />
          </button>

          <p
            className="cartItemQuantity"
            data-testid="shopping-cart-product-quantity"
          >
            { product.quantity }
          </p>

          <button
            className="increase"
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => this.increaseQuantity(product, product.quantity) }
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </li>
    );
  }
}

CartItem.propTypes = {
  product: shape({ id: string }).isRequired,
  updateCartItems: func.isRequired,
};

export default CartItem;
