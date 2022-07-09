export async function getCategories() {
  const URL_API = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const response = await fetch(URL_API);
    const categories = await response.json();
    return categories;
  } catch {
    return [];
  }
}

export async function getProductsFromCategoryAndQuery(id, query) {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`;
  try {
    const response = await fetch(URL_API);
    const products = await response.json();
    return products;
  } catch {
    return [];
  }
}

export async function getProductsById(id) {
  const URL_API = `https://api.mercadolibre.com/items/${id}`;
  try {
    const response = await fetch(URL_API);
    const product = await response.json();
    return product;
  } catch {
    return {};
  }
}
