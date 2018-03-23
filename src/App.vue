<template>
  <div id="app">
    <navigation/>
    <router-view id="dc"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {Navigation},
  mounted () {
    document.getElementById('dc').style.marginTop = document.getElementById('navbar').scrollHeight + 'px'
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
