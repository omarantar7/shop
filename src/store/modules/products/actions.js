export default {
  async loadProducts(context) {
    const response = await fetch(
      'https://shop-835e4-default-rtdb.firebaseio.com/products.json'
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const products = [];
    for (const key in responseData) {
      const product = {
        id: key,
        title: responseData[key].title,
        image: responseData[key].image,
        price: responseData[key].price,
        description: responseData[key].description,
        added:responseData[key].added
      };
      products.push(product);
    }
    context.commit('setProducts', products);
    
    
  },
};
