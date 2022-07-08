import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from './Routes';

class App extends Component {
  constructor() {
    super();

    this.addProductToCart = this.addProductToCart.bind(this);
    this.productQuantity = this.productQuantity.bind(this);

    this.state = {
      cartItems: [],
    };
  }

  addProductToCart(product) {
    const { cartItems } = this.state;

    const productItem = product;
    productItem.quantity = this.productQuantity(product);

    const allCartItems = cartItems.filter(({ id }) => id !== product.id);

    this.setState({
      cartItems: [...allCartItems, productItem],
    });
  }

  productQuantity(product) {
    const { cartItems } = this.state;

    const quantity = cartItems.filter(({ id }) => id === product.id);
    const { length } = quantity;

    return length === 0 ? 1 : length + 1;
  }

  render() {
    const { cartItems } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Routes cartItems={ cartItems } addProductToCart={ this.addProductToCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
