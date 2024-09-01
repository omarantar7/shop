import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      cart: { items: [], total: 0, qt: 0 },
    };
  },
  mutations,
  actions,
  getters,
};
