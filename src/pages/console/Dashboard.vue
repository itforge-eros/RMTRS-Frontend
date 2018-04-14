<template>
  <div id="main" :ref="'main'">
      <div class="container-fluid">
          <div class="row">
            <div class="col-3" id="c-navigation">
              <console-navigation />
            </div>
            <div class="col" id="displayer">
              <vuetable></vuetable>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import ConsoleNavigation from '@/components/console/ConsoleNavigation'
import Vuetable from '@/pages/console/section/Vuetable'
export default {
  name: 'Console',
  components: {ConsoleNavigation, Vuetable},
  mounted () {
    this.$refs.main.style.paddingTop = document.getElementById('navbar').scrollHeight + 'px'
  }
}
</script>

<style lang="scss" scoped>
#c-navigation {
  background-color: $main-gray;
  border-right: 5px solid $main-blue;
}
</style>
