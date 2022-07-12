import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAllSavedItemsOnCart, getTotalPriceOfCart } from '../js/localStorageFunctions';

import CartItem from '../components/CartItem';
import '../css/ShoppingCart.css';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.updateCartItems = this.updateCartItems.bind(this);

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

  render() {
    const { cartItems } = this.state;
    const totalPrice = getTotalPriceOfCart().toFixed(2);

    return (
      <div className="shoppingCartPage">
        <h1 className="shoppingCartPageTitle">
          <i className="fa-solid fa-cart-shopping" />
          Carrinho de compras
        </h1>

        { cartItems.length === 0
          ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
          : (
            <div className="shoppingCartPageItemsContainer">
              <ul className="shoppingCartPageItems">
                { cartItems.map((product) => (
                  <CartItem
                    key={ product.id }
                    product={ product }
                    updateCartItems={ this.updateCartItems }
                  />
                )) }
              </ul>

              <div className="shoppingCartPageTotalContainer">
                <p className="shoppingCartPageTotal">
                  Total da compra:
                  <span>{ totalPrice }</span>
                </p>

                <Link
                  className="shoppingCartPageCheckout"
                  data-testid="checkout-products"
                  to="/checkout"
                >
                  finalizar pedido
                </Link>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default ShoppingCart;
