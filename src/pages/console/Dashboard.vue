<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-2" id="c-navigation" :ref="'cNavigation'">
          <console-navigation />
        </div>
        <div class="col" id="displayer" :ref="'displayer'">
          <router-view />
        </div>
      </div>
  </div>
</template>

<script>
import ConsoleNavigation from '@/components/console/ConsoleNavigation'
export default {
  name: 'Console',
  components: {ConsoleNavigation},
  mounted () {
    this.$refs.cNavigation.style.paddingTop = document.getElementById('navbar').scrollHeight - 1 + 'px'
    this.$refs.displayer.style.paddingTop = document.getElementById('navbar').scrollHeight - 1 + 'px'
  }
}
</script>

<style lang="scss" scoped>
#c-navigation {
  background-color: $main-gray;
  border-right: 5px solid $main-blue;
  padding-left: 0;
  padding-right: 0;
}
#displayer {
  height: 100vh;
  overflow-y: auto;
}
</style>
