import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { number } from 'prop-types';

import ShoppingCartButton from './ShoppingCartButton';

import './Header.css';

class Header extends Component {
  render() {
    const { cartCounter } = this.props;

    return (
      <header className="header">
        <Link className="storeName" to="/">
          thyl
          <span>Store</span>
        </Link>
        <ShoppingCartButton cartCounter={ cartCounter } />
      </header>
    );
  }
}

Header.propTypes = {
  cartCounter: number.isRequired,
};

export default Header;
