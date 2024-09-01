<template>
  <header>
    <router-link to="/products">Shop</router-link>
    <div v-if="authenticated">
      <router-link to="/Cart">Cart</router-link><span>{{ totalQt }}</span>
      <button @click="logout">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  computed:{
    authenticated(){
      return this.$store.getters.isAuthenticated;
    },
    totalQt(){
      return this.$store.getters['cart/totalQt'];
    }
  },
  created(){
    this.loadQt()
  },
  methods:{
    async loadQt() {
      try {
        await this.$store.dispatch('cart/loadQt');
      } catch (error) {
        this.error = error.message || 'Something Went Wrong';
      }
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.replace('/auth')
    }
  }
}
</script>

<style scoped>
header {
  background-color: #b1df57;
  align-items: center;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
}
header > a:first-child {
  margin: 0;
  font-size: 42px;
  padding: 0;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
div{
  align-items: center;
}
button{
  padding: .5rem 1rem;
  font-size: 1.25rem;
  margin-left: .5rem;
  background-color: transparent;
  color: white;
  border: 3px solid white;
  border-radius: .75rem;
  cursor: pointer;
}
button:hover,button:active{
  background-color: white;
  color: #8cc41e;
}
a{
  color: white;
  text-decoration: none;
  padding: 1rem;
  padding-right: .5rem;
  font-size: 1.5rem;
}
a:hover,a:active{
  text-decoration: underline;
}
span{
  border: 2px solid white;
  color: #8cc41e;
  border-radius: 50%;
  padding: .15rem .5rem ;
  background-color: white;
  margin: 0;
  font-family: cursive;
}
</style>