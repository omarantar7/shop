<template>
  <section>
    <li>
      <img :src="image" />
      <h2>{{ title }}</h2>
      <h4>{{ price }} $</h4>
      <p>{{ description }}</p>
      <div>
        <base-button @click="addToCart" v-if="!add">+Add</base-button>
        <base-button @click="removeFromCart" v-else>Added</base-button>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  props: ['id', 'title', 'image', 'description', 'price', 'added'],
  data(){
    return{
      add:this.added
    }
  },
  methods: {
    removeFromCart(){
      fetch(`https://shop-835e4-default-rtdb.firebaseio.com/products/${this.id}.json`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          'added':false
        })}
      )

      fetch(`https://shop-835e4-default-rtdb.firebaseio.com/cart/${this.id}.json`,{
        method:'DELETE'
      })

      this.$store.commit('cart/removeItemFromCart',{prdId:this.id,price:this.price});

      this.add=!this.add
    },
    addToCart() {
      fetch(`https://shop-835e4-default-rtdb.firebaseio.com/products/${this.id}.json`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          'added':true
        })
        
      });
      this.$store.dispatch('cart/addToCart', {
        id: this.id,
        title: this.title,
        image: this.image,
        description: this.description,
        price:this.price,
        added:this.added
      });
      this.add=!this.add
    },
  },
};
</script>

<style scoped>
section {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  padding-bottom: 2rem;
  margin: 2rem auto;
  background-color: white;
}
h2,
h4 {
  margin: 0;
}
img {
  border-radius: 12px;
  width: 26rem;
  height: 26rem;
  object-fit: cover;
}
h4 {
  color: rgb(23, 228, 16);
}
@media (max-width:450px){
  img{
    width: 16rem;
    height: 16rem;
  }
}
</style>