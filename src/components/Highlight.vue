<template>
    <carousel :perPage=1>
        <slide v-for="movie in movieData" :key="movie.id">
            <movie-hero :img="movie.poster_url" :enTitle="movie.en_title" :description="movie.synopsis"/>
        </slide>
    </carousel>
</template>

<script>
import MovieHero from '@/components/MovieHero'
import {Carousel, Slide} from 'vue-carousel'
export default {
  name: 'Highlight',
  components: {Carousel, Slide, MovieHero},
  props: ['movieData']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.highlight {
    position: relative;
    .img-wall {
        position: relative;
        z-index: 0;
        width: 100%;
        height: 60vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            position: absolute;
            width: 100vw;
        }
        .detail {
            position: absolute;
            left: 15px;
            top: 50%;
            margin: 10px;
            transform: translateY(-50%);
            min-width: 300px;
            max-width: 400px;
            z-index: 2;
            padding: 1em;
            background-color: rgba($color: #ffffff, $alpha: 0.8);
            border-radius: $main-round;
        }
    }
}
</style>
