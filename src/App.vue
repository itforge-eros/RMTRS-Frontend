<template>
  <div id="app">
    <navigation :ref="'navigation'"/>
    <div :ref="'space'"></div>
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {Navigation},
  mounted () {
    this.$refs.space.style.marginTop = this.$refs.navigation.$el.scrollHeight + 'px'
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
