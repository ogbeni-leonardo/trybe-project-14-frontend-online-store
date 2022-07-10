import React, { Component } from 'react';
import { shape, string } from 'prop-types';

import { getProductsById } from '../services/api';
import {
  getQuantityOfProductsOfCart,
  addProductToCart,
} from '../js/localStorageFunctions';

import Header from '../components/Header';
import EvaluationForm from '../components/EvaluationForm';
import '../css/Details.css';

class Details extends Component {
  constructor() {
    super();

    this.cartSizeUpdate = this.cartSizeUpdate.bind(this);

    this.state = {
      cartSize: getQuantityOfProductsOfCart(),
      product: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const product = await getProductsById(id);
    this.setState({ product });
  }

  cartSizeUpdate() {
    const cartSize = getQuantityOfProductsOfCart();
    this.setState({ cartSize });
  }

  render() {
    const { cartSize, product } = this.state;
    const { shipping } = product;

    return (
      <div className="detailsPage">
        <Header cartSize={ cartSize } />

        {/* A partir daqui tudo sí será renderizado se houver um produto. */}
        { product.id && (
          <>
            <section className="productDetailsContainer">
              {/* Este elemento tem as mesmas classes do componente ProductCard.
              O fato de não reutilizarmos é que sua propriedade de teste é diferente,
              o que causa erros. */}
              <div className="productCard">
                <div
                  className="productCardImageContainer"
                  style={ { backgroundImage: `url(${product.thumbnail})` } }
                >
                  <img
                    alt={ product.title }
                    className="productCardImage"
                    src={ product.thumbnail }
                  />
                  <p
                    className="productCardName"
                    data-testid="product-detail-name"
                  >
                    { product.title }
                  </p>
                </div>

                <div className="productPriceAndShipping">
                  { shipping.free_shipping && (
                    <p
                      className="productShipping"
                      data-testid="free-shipping"
                    >
                      Frete grátis
                    </p>
                  ) }

                  <p className="productCardPrice">{ product.price }</p>
                </div>

                <div className="productCardAddButtonContainer">
                  <button
                    className="productCardAddButton"
                    data-testid="product-detail-add-to-cart"
                    onClick={ () => {
                      addProductToCart(product);
                      this.cartSizeUpdate();
                    } }
                    type="button"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>

              <div className="productDetails">
                <h2>Detalhes:</h2>
                <ul>
                  { product.attributes.map((attribute) => (
                    <li key={ attribute.id }>
                      <span>{ `${attribute.name}:` }</span>
                      { attribute.value_name || 'Não informado' }
                    </li>
                  )) }
                </ul>
              </div>
            </section>

            <h2 className="evaluationTitle">Avaliações</h2>

            <EvaluationForm productID={ product.id } />
          </>
        ) }
      </div>
    );
  }
}

Details.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default Details;
