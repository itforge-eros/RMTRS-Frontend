<template>
<div id="editor" v-if="theatre !== null">
  <div class="row">
    <div class="col p-0">
      <h3 class="header py-2 px-4">ข้อมูลโรงฉายภาพยนตร์ <span class="float-right">{{ theatre.name }}</span></h3>
    </div>
  </div>
  <div class="row my-2 justify-content-center mb-3" v-for="(row, index) in rows" :key="index">
      <chair v-for="column in 10" :key="column" :seat="seats[row+column]"/>
  </div>
</div>
</template>

<script>
import seatFacade from '@/facades/SeatFacade'
import Chair from '@/components/console/Chair'
export default {
  name: 'TheatreEditor',
  components: {Chair},
  data () {
    return {
      rows: null,
      theatre: null,
      seats: null
    }
  },
  mounted () {
    this.fetchTheatre(this.$route.params.id)
  },
  methods: {
    fetchTheatre (id) {
      seatFacade.getSeatsAndTheatre(id)
        .then(({rows, theatre, seats}) => {
          this.rows = rows
          this.theatre = theatre
          this.seats = seats
        })
    }
  }
}
</script>
