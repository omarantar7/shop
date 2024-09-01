export default {
  addToCart(state, payload) {
    state.cart.items.push(payload);
    state.cart.total += payload.price;
    state.cart.qt++;
    fetch(`https://shop-835e4-default-rtdb.firebaseio.com/total.json`, {
      method: 'PUT',
      body: JSON.stringify(state.cart.total),
    });
    fetch(`https://shop-835e4-default-rtdb.firebaseio.com/Qt.json`, {
      method: 'PUT',
      body: JSON.stringify(state.cart.qt),
    });
  },
  setCartItems(state, payload) {
    state.cart.items = payload;
  },
  setTotalSum(state, payload) {
    state.cart.total = payload;
  },
  setQt(state, payload) {
    state.cart.qt = payload;
  },
  removeItemFromCart(state, payload) {
    const productInCartIndex = state.cart.items.findIndex(
      (cartItem) => cartItem.id === payload.prdId
    );
    state.cart.items.splice(productInCartIndex, 1);
    state.cart.total -= payload.price;
    state.cart.qt--;

    if (state.cart.total < 0 || state.cart.total === isNaN) {
      state.cart.total = 0;
    }
    if(state.cart.qt<0){
      state.cart.qt = 0;
    }
    fetch(`https://shop-835e4-default-rtdb.firebaseio.com/total.json`, {
      method: 'PUT',
      body: JSON.stringify(state.cart.total),
    });
    fetch(`https://shop-835e4-default-rtdb.firebaseio.com/Qt.json`, {
      method: 'PUT',
      body: JSON.stringify(state.cart.qt),
    });
  },
};
