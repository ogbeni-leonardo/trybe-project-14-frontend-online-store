import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from './Routes';

class App extends Component {
  constructor() {
    super();

    this.addProductToCart = this.addProductToCart.bind(this);
    this.productQuantity = this.productQuantity.bind(this);
  }

  /* Quando o nosso App for renderizado ele irá verificar se o localStorage
  foi inicializado. Caso não tenha sido ele criará uma nova propriedade chamada cartItems
  que conterá todos os itens salvos no carrinho. */
  componentDidMount() {
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  }

  addProductToCart(product, quantity) {
    // Esta função retorna do localStorage todos os items salvos no carrinho
    const allSavedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    const productItem = product;
    // Se a quantidade de itens for informada adicione, caso contrário, verifique se tal item já existe
    productItem.quantity = quantity || this.productQuantity(product);

    // Pegue dos items salvos todos, exceto o item atual
    const allCartItemsWithoutThisProduct = allSavedCartItems
      .filter(({ id }) => id !== product.id);

    // Adicione ao localStorage todos os itens anteriores, exceto o atual e, logo em seguida, o atual
    localStorage.setItem('cartItems', JSON.stringify([
      ...allCartItemsWithoutThisProduct,
      productItem,
    ]));
  }

  productQuantity(product) {
    const allSavedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    // Verificando quando produtos do mesmo tipo estão no carrinho
    const quantityOfTheSameProduct = allSavedCartItems
      .filter(({ id }) => id === product.id);

    const { length } = quantityOfTheSameProduct;

    /* Se não houver itens idênticos ele será o primeiro, então retorne 1. Caso haja, retorne o tamanho total + 1, afinal
    o item que será adicionado deve ser somado aos que já existem dele mesmo. */
    return length === 0 ? 1 : length + 1;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Routes addProductToCart={ this.addProductToCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
