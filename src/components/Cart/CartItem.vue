<template>
  <section>
    <img :src="image" alt="product image" />
    <div>
      <h1>{{ title }}</h1>
      <h4>{{ price }} $</h4>
      <p>{{ description }}</p>
    </div>
    <span @click="removeItem">-</span>
  </section>
</template>

<script>
export default {
  props: ['title', 'id', 'image', 'description', 'price', 'added'],
  methods: {
    removeItem() {
      fetch(`https://shop-835e4-default-rtdb.firebaseio.com/products/${this.id}.json`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          'added':false
        })}
      )

      fetch(`https://shop-835e4-default-rtdb.firebaseio.com/cart/${this.id}.json`, {
        method: 'DELETE',
      });

      this.$store.dispatch('cart/removeFromCart',{prdId:this.id,price:this.price});

    },
  },
};
</script>

<style scoped>
section {
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  gap: 3rem;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  align-items: center;
}
img {
  width: 20%;
  height: fit-content;
  border-radius: 2rem;
  object-fit: cover;
}
h1 {
  margin-bottom: 0;
}
h4 {
  margin: 0;
  color: #b1df57;
}
span {
  border: 1px solid #b1df57;
  color: #b1df57;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  margin-right: 2rem;
  cursor: pointer;
}
@media (max-width:800px){
  section{
    flex-direction: column;
  }
  img{
    width: 100%;
  }
}
</style>