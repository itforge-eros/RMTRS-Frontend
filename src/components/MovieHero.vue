<template>
  <div id="movie-hero">
      <img class="movie-hero-bg" :src="img">
      <div class="container">
          <div class="row align-items-end" id="movie-hero-content">
              <div class="col-12 col-md-5">
                  <div id="logo-wall" :style="{'background-image': 'url('+img+')'}"></div>
              </div>
              <div class="col-12 col-md-7">
                <div class="detail">
                    <h2>{{ enTitle }}</h2>
                    <p>{{ description }}</p>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MovieHero',
  props: ['img', 'enTitle', 'description']
}
</script>

<style lang="scss" scoped>
#movie-hero {
    transition: all 0.3 ease;
    position: relative;
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    .movie-hero-bg {
        min-width: 100%;
        min-height: 100%;
        filter: blur(5px) brightness(0.6);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.1);
    }
    .detail {
        padding: 1.7em;
        position: relative;
        background-color: rgba($color: lighten($color: $main-white, $amount: 20%), $alpha: 1);
        border-radius: $main-round;
    }
    #logo-wall {
        position: relative;
        width: 100%;
        padding-top: 100%;
        overflow: hidden;
        border-radius: $main-round;
        background-size: cover;
        background-position: center;
    }
}

#movie-hero-content {
    margin: 5vh 3em;
}

@media screen and (max-width:420px) {
    #movie-hero-content {
        margin: 1.5vh 1vw;
    }
}

@media screen and (max-width:767px) {
    .detail {
        margin-top: 1em;
    }
}

@media screen and (max-width:991px) {
    #movie-hero-content {
        align-items: flex-start!important;
    }
}
</style>
