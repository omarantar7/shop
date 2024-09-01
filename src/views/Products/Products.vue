<template>
  <section>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <h1>Products</h1>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else>
      <ul class="products">
        <product-item
          v-for="prd in products"
          :key="prd.id"
          :id="prd.id"
          :title="prd.title"
          :image="prd.image"
          :price="prd.price"
          :description="prd.description"
          :added="prd.added"
        ></product-item>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    products() {
      return this.$store.getters['products/products'];
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('products/loadProducts');
      } catch (err) {
        this.error = err.message || 'Something Went Wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
section {
  margin: 0 2rem;
}
ul {
  list-style: none;
  padding: 0;
  width: 90%;
}
h1 {
  margin: 0;
  padding-top: 2rem;
  font-size: 40px;
  font-weight: bold;
}
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
@media (max-width: 800px) {
  .products {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 450px) {
  .products {
    grid-template-columns: 1fr;
    padding: 0;
  }
}
</style>