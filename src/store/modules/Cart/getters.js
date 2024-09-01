export default{
  cartItems(state){
    return state.cart.items;
  },
  totalSum(state){
    return state.cart.total
  },
  totalQt(state){
    return state.cart.qt;
  },
  hasProduct(state){
    return state.cart.items && state.cart.items.length > 0;
  }
}