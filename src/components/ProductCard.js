import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape, string, func } from 'prop-types';

import './ProductCard.css';

class ProductCard extends Component {
  render() {
    const { product, addProductToCart, cartCounterUpdate } = this.props;
    const { id, title, price, thumbnail } = product;

    return (
      <li data-testid="product" className="productCard">
        <Link
          className="productCardLink"
          data-testid="product-detail-link"
          to={ `/details/${id}` }
        >
          <div
            className="productCardImageContainer"
            style={ { backgroundImage: `url(${thumbnail})` } }
          >
            <img alt={ title } className="productCardImage" src={ thumbnail } />
            <p className="productCardName">{ title }</p>
          </div>

          <p className="productCardPrice">{ price }</p>
        </Link>

        <div className="productCardAddButtonContainer">
          <button
            className="productCardAddButton"
            data-testid="product-add-to-cart"
            onClick={ () => {
              addProductToCart(product);
              cartCounterUpdate();
            } }
            type="button"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </li>
    );
  }
}

ProductCard.propTypes = {
  addProductToCart: func.isRequired,
  cartCounterUpdate: func.isRequired,
  product: shape({ id: string }).isRequired,
};

export default ProductCard;
