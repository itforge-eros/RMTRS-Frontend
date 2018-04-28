<template>
    <router-link :to="'/movie/'+id" class="movie-card col-12 col-sm-6 col-md-4 col-xl-3">
      <div class="img-wall">
        <img :src="img">
      </div>
      <div class="detail">
        <p>{{ title }}</p>
      </div>
    </router-link>
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['id', 'title', 'img']
}
</script>

<style lang="scss" scoped>

    .movie-card {
        height: 560px;
        min-width: 320px;
        max-width: 320px;
        border-radius: $main-round;
        overflow: hidden;
        text-decoration: none!important;
        color: #000000;
        .detail {
            background-color: adjust-color($color: $main-gray, $lightness: 50%, $alpha: 1.0);
            border-radius: $main-card-down-round;
            overflow: hidden;
            p {
                margin: 0;
                padding: 1em 10px;
            }
        }
        .img-wall {
            width: 100%;
            height: 73%;
            background: linear-gradient(125deg, rgb(2, 109, 255), rgb(107, 204, 255));
            overflow: hidden;
            border-radius: $main-card-up-round;
            img {
                display: block;
                min-width: 100%;
                height: 100%;
                position: relative;
            }
        }
    }

</style>
