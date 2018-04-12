<template>
  <div class="wall">
    <movie-hero v-if="movie !== null"
    :img="movie.poster_url"
    :enTitle="movie.en_title"
    :description="movie.synopsis" />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MovieHero from '../components/MovieHero'
import ScreeningDetail from '../components/ScreeningDetail'
import facade from '../facades/ScreeningFacade'
export default {
  name: 'Screening',
  components: {MovieHero, ScreeningDetail},
  data () {
    return {
      movieId: this.$route.params.id,
      movie: null
    }
  },
  watch: {
    '$route': 'fetchMovie'
  },
  mounted () {
    this.fetchMovie()
  },
  methods: {
    fetchMovie () {
      facade.getMovie(this.movieId)
        .then(({data}) => {
          this.movie = data
          console.log(this.movie)
        })
        .catch(console.log)
    }
  }
}
</script>
