import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class Content extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/details/:id" render={ (props) => <Details { ...props } /> } />
      </>
    );
  }
}

export default Content;
