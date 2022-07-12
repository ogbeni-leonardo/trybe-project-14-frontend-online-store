const productQuantity = (product) => {
  const allSavedCartItems = JSON.parse(localStorage.getItem('thylCartItems'));
  // Filtre pelo produto atual verificando se ele já existe
  const alreadyExists = allSavedCartItems.filter(({ id }) => id === product.id);
  /* Retorne a quantidade atual deste produto. */
  return alreadyExists.length > 0 ? alreadyExists[0].quantity + 1 : 1;
};

export const addProductToCart = (product, quantity) => {
  // Esta função retorna do localStorage todos os items salvos no carrinho.
  const allSavedCartItems = JSON.parse(localStorage.getItem('thylCartItems'));
  // Primeiro, verifique se este produto já existe no carrinho
  const exists = allSavedCartItems.some((item) => item.id === product.id);
  // Caso o item já exista, percorra o array dos items e altere somente ele
  if (exists) {
    const updateCartItems = allSavedCartItems.map((item) => {
      const productItem = item;
      if (productItem.id === product.id) {
        productItem.quantity = quantity || productQuantity(product);
      }
      return productItem;
    });
    return localStorage.setItem('thylCartItems', JSON.stringify(updateCartItems));
  }
  // Caso ele não exista, defina a quantidade dele para 1
  const productItem = product;
  productItem.quantity = 1;

  allSavedCartItems.push(productItem);
  localStorage.setItem('thylCartItems', JSON.stringify(allSavedCartItems));
};

export const getQuantityOfProductsOfCart = () => {
  const allSavedCartItems = JSON.parse(localStorage.getItem('thylCartItems'));
  /* Caso o localStorage já tenha sido inicializado prossiga... */
  if (allSavedCartItems) {
    /* Retorne a quantidade total de itens no carrinho. */
    return allSavedCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }
  /* Caso não tenha sido inicializado retorne 0.  */
  return 0;
};

export const getAllSavedItemsOnCart = () => (
  JSON.parse(localStorage.getItem('thylCartItems')));

export const getTotalPriceOfCart = () => {
  const allSavedCartItems = getAllSavedItemsOnCart();
  return allSavedCartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
};

/* Inicializando o localStorage. */
if (!localStorage.getItem('thylCartItems')) {
  localStorage.setItem('thylCartItems', JSON.stringify([]));
  localStorage.setItem('thylEvaluations', JSON.stringify([]));
}
