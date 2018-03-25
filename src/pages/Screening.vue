<template>
  <div class="wall">
    <movie-hero
    img="http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/2017/04/gotg2.jpg?itok=YoxtpMx9"
    title="Guardians Of The Galaxy 2"
    description="Peter Quill and his fellow Guardians are hired by a powerful alien race, the Sovereign, to protect their precious batteries from invaders. When it is discovered that Rocket has stolen the items they were sent to guard, the Sovereign dispatch their armada to search for vengeance. As the Guardians try to escape, the mystery of Peter's parentage is revealed." />
  </div>
</template>

<script>
import moment from 'moment'
import MovieHero from '../components/MovieHero'
import ScreeningFacade from '../facades/ScreeningFacade'
export default {
  name: 'Screening',
  components: {MovieHero},
  data () {
    return {
      msg: 'Showtime Page',
      id: null
    }
  },
  created () {
    this.id = this.$route.params.id // movie id
    this.date = this.$route.query.date // date from query string
    if (!this.date) this.date = moment()
    ScreeningFacade
      .getAvailableScreenings(this.date, this.id)
      .then(({data}) => console.log(data)) // data is list of screenings
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
