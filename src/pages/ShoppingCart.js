import React, { Component } from 'react';
import { func } from 'prop-types';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.getAllSavedCartItems = this.getAllSavedCartItems.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.getAllSavedCartItems();
  }

  getAllSavedCartItems() {
    const allSavedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ cartItems: allSavedCartItems });
  }

  decreaseQuantity(product, quantity) {
    const { addProductToCart } = this.props;

    if (quantity > 1) {
      addProductToCart(product, quantity - 1);
      this.getAllSavedCartItems();
    }
  }

  increaseQuantity(product, quantity) {
    const { addProductToCart } = this.props;
    addProductToCart(product, quantity + 1);
    this.getAllSavedCartItems();
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
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  addProductToCart: func.isRequired,
};

export default ShoppingCart;
