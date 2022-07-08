import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape, string, number, func } from 'prop-types';

class ProductCard extends Component {
  render() {
    const { product, addProductToCart } = this.props;
    const { id, title, price, thumbnail } = product;

    return (
      <li data-testid="product">
        <h2>{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <Link to={ `/details/${id}` } data-testid="product-detail-link">Detalhes</Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addProductToCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </li>
    );
  }
}

ProductCard.propTypes = {
  product: shape({
    title: string,
    price: number,
    thumbnail: string,
  }).isRequired,
  addProductToCart: func.isRequired,
};

export default ProductCard;
