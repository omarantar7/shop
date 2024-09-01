import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';
import store from './store/index';

import BaseButton from './components/UI/BaseButton.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import ProductItem from './components/Products/ProductItem.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-button',BaseButton);
app.component('base-spinner',BaseSpinner);
app.component('base-dialog',BaseDialog);
app.component('product-item',ProductItem);

app.mount('#app');
