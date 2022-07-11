import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAllSavedItemsOnCart, addProductToCart } from '../js/localStorageFunctions';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.updateCartItems = this.updateCartItems.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.updateCartItems();
  }

  updateCartItems() {
    const allSavedCartItems = getAllSavedItemsOnCart();
    this.setState({ cartItems: allSavedCartItems });
  }

  decreaseQuantity(product, quantity) {
    if (quantity > 1) {
      addProductToCart(product, quantity - 1);
      this.updateCartItems();
    }
  }

  increaseQuantity(product, quantity) {
    addProductToCart(product, quantity + 1);
    this.updateCartItems();
  }

  render() {
    const { cartItems } = this.state;

    return (
      <div>
        { cartItems.length === 0
          ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
          : cartItems.map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
              <p>{ product.price }</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseQuantity(product, product.quantity) }
              >
                -
              </button>
              <span>{ product.quantity }</span>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseQuantity(product, product.quantity) }
              >
                +
              </button>
            </div>
          ))}
            <Link to="/checkout"
              data-testid="checkout-products"
            >
              Checkout
            </Link>
      </div>
    );
  }
}

export default ShoppingCart;
