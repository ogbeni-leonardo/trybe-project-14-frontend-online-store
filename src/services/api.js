export async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(id, query) {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`;
  try {
    const response = await fetch(URL_API);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts(query) {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(URL_API);
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}
