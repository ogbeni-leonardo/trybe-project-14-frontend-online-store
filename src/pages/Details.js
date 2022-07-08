import React from 'react';
import { shape, string } from 'prop-types';

import { getProductsById } from '../services/api';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const product = await getProductsById(id);
    this.setState({ product: [product] });
  }

  render() {
    const { product } = this.state;

    return (
      <>
        { product.map(({ title, thumbnail, price }, index) => (
          <div key={ index }>
            <h2 data-testid="product-detail-name">{ title }</h2>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
          </div>
        )) }
      </>
    );
  }
}

Details.propTypes = {
  match: shape({
    params: shape({ id: string }),
  }).isRequired,
};

export default Details;
