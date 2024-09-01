<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <div class="head">
      <h1>Cart</h1>
      <span>total: {{totalSum}}$</span>
    </div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasProduct">
      <cart-item
      v-for="cart in cartItems"
      :key="cart.id"
      :id="cart.id"
      :title="cart.title"
      :description="cart.description"
      :image="cart.image"
      :price="cart.price"
      :added="cart.added"
      ></cart-item>
    </ul>
    <h3 v-else>Your Cart Is Empty</h3>
  </div>
</template>

<script>
import CartItem from '../../components/Cart/CartItem.vue';

export default {
  components: {
    CartItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters['cart/cartItems'];
    },
    totalSum() {
      return this.$store.getters['cart/totalSum'];
    },
    hasProduct(){
      return this.$store.getters['cart/hasProduct']
    }
  },
  created() {
    this.loadCartItems();
    this.loadTotalSum();
  },
  methods: {
    async loadCartItems() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('cart/loadCartItems');
      } catch (error) {
        this.error = error.message || 'Something Went Wrong';
      }
      this.isLoading = false;
    },
    async loadTotalSum() {
      try {
        await this.$store.dispatch('cart/loadTotalSum');
      } catch (error) {
        this.error = error.message || 'Something Went Wrong';
      }
    },
    
    handleError() {
      this.error = null;
    },

  },
};
</script>

<style scoped>
div {
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 4rem;
}
h1 {
  color: black;
  font-size: 2rem;

}
span {
  color: #3c5804;
  font-size: 1.25rem;
}
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0;
}
h3{
  text-align: center;
  font-size: 1.5rem;
  color: #3c5804;
}
@media (max-width:450px){
  div{
    width:100%;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
  }
  ul{
    padding: 20px;
    
  }
  
}
</style>