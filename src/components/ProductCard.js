import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape, string, func } from 'prop-types';

import { addProductToCart } from '../js/localStorageFunctions';

import './ProductCard.css';

class ProductCard extends Component {
  render() {
    const { product, cartSizeUpdate } = this.props;
    const { id, title, price, thumbnail, shipping } = product;

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

          <div className="productPriceAndShipping">
            { shipping.free_shipping && (
              <p className="productShipping" data-testid="free-shipping">Frete grátis</p>
            ) }

            <p className="productCardPrice">{ price }</p>
          </div>
        </Link>

        <div className="productCardAddButtonContainer">
          <button
            className="productCardAddButton"
            data-testid="product-add-to-cart"
            onClick={ () => {
              addProductToCart(product);
              cartSizeUpdate();
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
  cartSizeUpdate: func.isRequired,
  product: shape({ id: string }).isRequired,
};

export default ProductCard;
