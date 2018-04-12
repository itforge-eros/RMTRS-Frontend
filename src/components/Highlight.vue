<template>
    <carousel :perPage=1>
        <slide v-for="movie in movieData" :key="movie.id">
            <div class="highlight">
                <div class="img-wall">
                    <img :src="movie.poster_url">
                    <div class="detail">
                        <h2>{{ movie.en_title }}</h2>
                        <p>{{ movie.synopsis }}</p>
                    </div>
                </div>
            </div>
        </slide>
    </carousel>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'
export default {
  name: 'Highlight',
  components: {Carousel, Slide},
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
