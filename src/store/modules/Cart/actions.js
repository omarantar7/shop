export default{
  async addToCart(context,data){
    const productData = {
      title:data.title,
      description:data.description,
      image:data.image,
      price:data.price,
      added:data.added
    }

    const response = await fetch(`https://shop-835e4-default-rtdb.firebaseio.com/cart/${data.id}.json`,{
      method:'PUT',
      body:JSON.stringify(productData)
    })

    //const responseData = await response.json();

    //console.log(responseData);
    

    if(!response.ok){
      //error
    }

    context.commit('addToCart',productData);
    

   

  },
  async loadCartItems(context) {
    const response = await fetch(
      'https://shop-835e4-default-rtdb.firebaseio.com/cart.json'
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const cartItems = [];
    for (const key in responseData) {
      const item = {
        id: key,
        title: responseData[key].title,
        image: responseData[key].image,
        price: responseData[key].price,
        description: responseData[key].description,
        added:responseData[key].added
      };
      cartItems.push(item);
    }
    context.commit('setCartItems', cartItems);
  },
  async loadTotalSum(context){
    const response = await fetch(
      'https://shop-835e4-default-rtdb.firebaseio.com/total.json'
    );
    const responseData = await response.json();
    if(!response.ok){
      const error = new Error(responseData.message||'Failed To Fetch')
      throw error;
    }
    const total = responseData;

    context.commit('setTotalSum',total)
    
    
  },
  async loadQt(context){
    const response = await fetch('https://shop-835e4-default-rtdb.firebaseio.com/Qt.json');
    const responseData = await response.json();
    if(!response.ok){
      const error = new Error (responseData.message || 'Failed To Fetch');
      throw error;
    }
    const Qt = responseData;
    context.commit('setQt',Qt)
    
  },
  removeFromCart(context,payload){
    context.commit('removeItemFromCart',payload)
  },
}