<template>
  <nav id="navbar">
    <router-link to="/" class="brand" href="#">Skydog Cineplex</router-link>
    <span v-if="getAccount !== null">
      <small class="text-muted"> : {{ getAccount.role }}</small>
    </span>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navigation',
  computed: {
    ...mapGetters([
      'getAccount'
    ])
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: $main-blue;
  padding: 15px 20px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 1.3em;
  z-index: 10;
  .brand {
    color: $main-yellow;
    text-decoration: none;
    font-weight: bold;
  }
  span {
    color: #ffffff;
  }
}
</style>
