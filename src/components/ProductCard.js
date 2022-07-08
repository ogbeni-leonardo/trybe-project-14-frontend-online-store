import React, { Component } from 'react';
import { shape, string, number } from 'prop-types';

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    const { title, price, thumbnail } = product;

    return (
      <li data-testid="product">
        <h2>{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <button type="button">Adicionar ao carrinho</button>
      </li>
    );
  }
}

ProductCard.propTypes = {
  product: shape({
    title: string.isRequired,
    price: number.isRequired,
    thumbnail: string.isRequired,
  }).isRequired,
};

export default ProductCard;
