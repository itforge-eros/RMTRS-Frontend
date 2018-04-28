<template>
  <div id="app">
    <navigation :ref="'navigation'"/>
    <div id="space-main" :ref="'space'"></div>
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'App',
  components: {Navigation},
  mounted () {
    this.$refs.space.style.height = (this.$refs.navigation.$el.scrollHeight - 1) + 'px'
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
