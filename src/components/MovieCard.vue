<template>
    <div class="movie-card col-4">
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
        .img-wall {
            width: 100%;
            height: 73%;
            background: linear-gradient(125deg, rgb(2, 109, 255), rgb(107, 204, 255));
            overflow: hidden;
            img {
                width: 110%;
                position: relative;
            }
        }
    }

</style>
