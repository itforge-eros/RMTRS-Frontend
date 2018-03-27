<template>
  <div class="container-fluid">
    <div class="container">
      <h3 class="text-center">
        {{msg}}
      </h3>
      <div>
        <p v-for="seat in seats" :key="seat['.key']">
          {{seat}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '@/config/firebase.config'
export default {
  name: 'Seat',
  data () {
    return {
      seats: [],
      msg: 'Seat Selection Page',
      screeningId: null
    }
  },
  firebase: {
    seats: db.ref('screenings/8')
  },
  created () {
    this.screeningId = this.$route.params.screeningId
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
