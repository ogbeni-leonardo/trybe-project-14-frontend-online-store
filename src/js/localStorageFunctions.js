const productQuantity = (product) => {
  const allSavedCartItems = JSON.parse(localStorage.getItem('thylCartItems'));
  // Filtre pelo produto atual verificando se ele já existe
  const alreadyExists = allSavedCartItems.filter(({ id }) => id === product.id);
  /* Retorne a quantidade atual deste produto. */
  return alreadyExists.length > 0 ? alreadyExists[0].quantity + 1 : 1;
};

export function addProductToCart(product, quantity) {
  // Esta função retorna do localStorage todos os items salvos no carrinho
  const allSavedCartItems = JSON.parse(localStorage.getItem('thylCartItems'));
  const productItem = product;
  // Se a quantidade de itens for informada adicione, caso contrário, verifique se tal item já existe
  productItem.quantity = quantity || productQuantity(product);
  // Pegue dos items salvos todos, exceto o item atual
  const allExceptThisOne = allSavedCartItems.filter(({ id }) => id !== product.id);
  // Adicione ao localStorage todos os itens anteriores, exceto o atual e, logo em seguida, o atual
  localStorage.setItem(
    'thylCartItems',
    JSON.stringify([...allExceptThisOne, productItem]),
  );
}

export function getQuantityOfProductsOfCart() {
  const allSavedCartItems = JSON.parse(localStorage.getItem('thylCartItems'));
  /* Caso o localStorage já tenha sido inicializado prossiga... */
  if (allSavedCartItems) {
    /* Retorne a quantidade total de itens no carrinho. */
    return allSavedCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }
  /* Caso não tenha sido inicializado retorne 0.  */
  return 0;
}

export function getAllSavedItemsOnCart() {
  return JSON.parse(localStorage.getItem('thylCartItems'));
}

/* Inicializando o localStorage. */
if (!localStorage.getItem('thylCartItems')) {
  localStorage.setItem('thylCartItems', JSON.stringify([]));
  localStorage.setItem('thylEvaluations', JSON.stringify([]));
}
