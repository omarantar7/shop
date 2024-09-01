import { createRouter, createWebHistory } from 'vue-router';
import UserAuth from '../views/Auth/userAuth.vue';
import Products from '../views/Products/Products.vue';
import UserCart from '../views/Cart/UserCart.vue';
import store from '../store/index';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: UserAuth },
    { path: '/products', component: Products, meta: { requireAuth: true } },
    { path: '/cart', component: UserCart, meta: { requireAuth: true } },
    {
      path: '/notFound(.*)',
      component: NotFound,
      meta: { requireUnauth: true },
    },
  ],
});

router.beforeEach((to,_, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requireUnauth && store.getters.isAuthenticated) {
    next('/products');
  } else {
    next();
  }
});

export default router;
