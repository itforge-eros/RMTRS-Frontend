<template>
    <div class="movie-card col-12 col-sm-6 col-md-4 col-xl-3">
        <div class="img-wall">
            <img :src="img">
        </div>
        <div class="detail">
            <h4>{{ title }}</h4>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['title', 'img']
}
</script>

<style lang="scss" scoped>

    .movie-card {
        width: 320px;
        height: 400px;
        border-radius: $main-round;
        overflow: hidden;
        .img-wall {
            width: 100%;
            height: 73%;
            background: linear-gradient(125deg, rgb(2, 109, 255), rgb(107, 204, 255));
            overflow: hidden;
            border-radius: $main-round;
            img {
                display: block;
                min-width: 100%;
                min-height: 100%;
                width: 100%;
                height: auto;
                position: relative;
            }
        }
    }

</style>
