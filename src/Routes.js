import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { arrayOf, shape, func } from 'prop-types';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class Content extends Component {
  render() {
    const { cartItems, addProductToCart } = this.props;

    return (
      <>
        <Route
          exact
          path="/"
          component={ () => <Home addProductToCart={ addProductToCart } /> }
        />
        <Route
          exact
          path="/shopping-cart"
          component={ () => <ShoppingCart cartItems={ cartItems } /> }
        />
        <Route
          path="/details/:id"
          render={ (props) => (
            <Details { ...props } addProductToCart={ addProductToCart } />
          ) }
        />
      </>
    );
  }
}

Content.propTypes = {
  cartItems: arrayOf(shape({})).isRequired,
  addProductToCart: func.isRequired,
};

export default Content;
