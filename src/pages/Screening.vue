<template>
  <div class="wall">
    <movie-hero
    img="http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/2017/04/gotg2.jpg?itok=YoxtpMx9"
    title="Guardians Of The Galaxy 2"
    description="Peter Quill and his fellow Guardians are hired by a powerful alien race, the Sovereign, to protect their precious batteries from invaders. When it is discovered that Rocket has stolen the items they were sent to guard, the Sovereign dispatch their armada to search for vengeance. As the Guardians try to escape, the mystery of Peter's parentage is revealed." />
    <div class="container">
      <screening-detail />
    </div>
  </div>
</template>

<script>
import MovieHero from '../components/MovieHero'
import ScreeningDetail from '../components/ScreeningDetail'
export default {
  name: 'Screening',
  components: {MovieHero, ScreeningDetail},
  data () {
    return {
      id: 0
    }
  },
  created () {
    this.id = this.$route.params.id // movie id
    this.date = this.$route.query.date // date from query string
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
