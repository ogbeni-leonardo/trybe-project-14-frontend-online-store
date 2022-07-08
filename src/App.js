import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from './Routes';

class App extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
    this.state = { cartItems: [] };
  }

  addProductToCart(product) {
    this.setState(({ cartItems }) => ({
      cartItems: [...cartItems, product],
    }));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Routes addProductToCart={ this.addProductToCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
