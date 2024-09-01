import { createStore } from 'vuex';

import authModule from './modules/auth/index';
import productsModule from './modules/products/index';
import cartModule from './modules/Cart/index';

const store = createStore({
  modules:{
    auth:authModule,
    products:productsModule,
    cart:cartModule
  }
})

export default store;