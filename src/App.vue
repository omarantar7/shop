<template>
  <the-header></the-header>
  <section>
    <router-view></router-view>
  </section>
</template>

<script>
import TheHeader from './components/Layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed:{
    didAutoLogout(){
      return this.$store.getters.didAutoLogout;
    }
  },
  created(){
    this.tryLogin();
  },
  watch:{
    didAutoLogout(curValue,oldValue){
      if(curValue && curValue !== oldValue){
        this.$router.replace('/auth')
      }
    }
  },
  methods:{
    tryLogin(){
      this.$store.dispatch('tryLogin');
      this.$router.replace('/products');

    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600&family=Comfortaa&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>