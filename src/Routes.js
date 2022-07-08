import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class Content extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
      </>
    );
  }
}

export default Content;
