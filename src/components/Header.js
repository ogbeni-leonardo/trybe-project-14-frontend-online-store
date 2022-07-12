import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { number } from 'prop-types';

import ShoppingCartButton from './ShoppingCartButton';

import './Header.css';

class Header extends Component {
  render() {
    const { cartSize } = this.props;

    return (
      <header className="header">
        <Link className="storeName" to="/">
          Thyl
          <span>Store</span>
        </Link>
        <ShoppingCartButton cartSize={ cartSize } />
      </header>
    );
  }
}

Header.propTypes = {
  cartSize: number.isRequired,
};

export default Header;
