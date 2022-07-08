import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { func } from 'prop-types';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class Content extends Component {
  render() {
    const { addProductToCart } = this.props;
    return (
      <>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route
          path="/details/:id"
          render={ (props) => (<Details
            addProductToCart={ addProductToCart }
            { ...props }
          />) }
        />
      </>
    );
  }
}
Content.propTypes = {
  addProductToCart: func.isRequired,
};

export default Content;
