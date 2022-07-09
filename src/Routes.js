import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { func } from 'prop-types';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class Routes extends Component {
  render() {
    const { addProductToCart } = this.props;

    return (
      <>
        <Route
          exact
          path="/"
          component={ () => <Home addProductToCart={ addProductToCart } /> }
        />

        <Route
          path="/details/:id"
          render={ (props) => (
            <Details { ...props } addProductToCart={ addProductToCart } />
          ) }
        />

        <Route
          exact
          path="/shopping-cart"
          component={ () => <ShoppingCart addProductToCart={ addProductToCart } /> }
        />
      </>
    );
  }
}

Routes.propTypes = {
  addProductToCart: func.isRequired,
};

export default Routes;
