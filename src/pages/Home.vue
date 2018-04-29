<template>
  <div class="wall">
    <Highlight :movieData="movieData" class="row"></Highlight>
    <div class="container">
      <div class="row justify-content-center">
        <movie-card v-for="movie in movieData" :key="movie.id" :id="movie.id" :title="movie.en_title" :img="movie.poster_url"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Highlight from '../components/Highlight'
import MovieCard from '../components/MovieCard'
import HomeFacade from '../facades/HomeFacade'
export default {
  name: 'Home',
  components: {Highlight, MovieCard},
  data () {
    return {
      date: moment(),
      movieData: null
    }
  },
  created () {
    HomeFacade.getAvailableMovies(this.date)
      .then(({data}) => {
        this.movieData = data.sort((a, b) => Math.random() > .5 ? -1 : 1)
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
