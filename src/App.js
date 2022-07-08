import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from './Routes';

class App extends Component {
  constructor() {
    super();

    this.addProductToCart = this.addProductToCart.bind(this);

    this.state = {
      cartItems: [],
    };
  }

  addProductToCart(product) {
    this.setState(({ cartItems }) => ({
      cartItems: [...cartItems, product],
    }));
    console.log('chamou');
    console.log(this.state);
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
