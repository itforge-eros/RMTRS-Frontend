<template>
  <div class="wall">
    <movie-hero
    :img="movie.poster_url"
    :enTitle="movie.en_title"
    :description="movie.synopsis" />
    <div class="container">
      <screening-detail />
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
  created () {
    this.fetchMovie()
  },
  methods: {
    fetchMovie () {
      facade.getMovie(this.movieId)
        .then(({data}) => {
          this.movie = data
        })
        .catch(console.log)
    }
  }
}
</script>
