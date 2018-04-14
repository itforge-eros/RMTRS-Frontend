<template>
  <div id="console" :class="consoleClass">
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'ConsolePage',
  computed: {
    consoleClass () {
      if (this.$route.path.indexOf('/console/login') !== -1) {
        return 'login'
      }
    }
  },
  mounted () {
    document.getElementById('space-main').style.display = 'none'
  },
  beforeDestroy () {
    document.getElementById('space-main').style.display = 'block'
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
