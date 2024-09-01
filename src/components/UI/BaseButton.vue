<template>
  <button v-if="!link">
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: null
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button {
  padding: 1rem 3rem;
  font: inherit;
  color: white;
  background-color: #779341;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  border: none;
}
a {
  text-decoration: none;
  color: #779341;
}
a:hover,
a:active {
  color: #a2d341;
}
button:hover,
button:active {
  background-color: #a2d341;
}
</style>