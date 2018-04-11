<template>
  <div id="main">
      <console-navigation />
      <div class="container">
          <div class="row">
              <div class="col">
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
  components: {ConsoleNavigation, Vuetable}
}
</script>
