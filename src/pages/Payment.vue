<template>
<div class="wall">
  <div class="container-fluid">
    <div class="row">
      <movie-hero v-if="movie !== null"
      :img="movie.poster_url"
      :enTitle="movie.en_title"
      :description="movie.synopsis" />
    </div>
    <div class="row" id="message">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7 text-md-right text-left" id="reservation-msg">
            <h2>We have reserved your seat(s)!</h2>
            <p class="mt-1">Please contact our staff to process the payment by showing this page</p>
            <h3 class="mt-5 mt-md-0 text-muted text-center text-md-right">Your theatre is</h3>
            <h2 class="text-center text-md-right"><b>{{ theatre }}</b></h2>
          </div>
          <div class="mt-5 mt-md-0 col-12 col-md-5">
            <div id="qr-code">
              QR code placeholder
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 col-md-3 seat m-1" v-for="(seat, index) in seats" :key="index">
            <div class="row">
              <div class="col-6">
                <img src="../assets/chair.png" alt="">
              </div>
              <div class="col id">
                <h3>{{ seat }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MovieHero from '@/components/MovieHero'
export default {
  name: 'Payment',
  components: {MovieHero},
  data () {
    return {
      movie: {
        poster_url: 'https://i.imgur.com/SI1rJi8.jpg',
        en_title: 'The Hitman’s Bodyguard',
        synopsis: 'The world\'s top bodyguard gets a new client, a hit man who must testify at the International Criminal Court. They must put their differences aside and work together to make it to the trial on time'
      },
      theatre: 'T1',
      seats: ['A2', 'A3', 'A4']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#reservation-msg {
  border-right: 5px solid #000000;
}
#message {
  background-color: adjust-color($color: $main-gray, $lightness: 50%, $alpha: 1.0);
  padding: 2em;
}
.seat {
  padding: 1em;
  background-color: adjust-color($color: $main-blue, $lightness: 70%, $alpha: 1.0);
  border-radius: $main-round;
  img {
    display: block;
    width: 100%;
    max-width: 60px;
    margin: 0 auto;
  }
  .id {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
#qr-code {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
}

@media screen and (max-width: 767px) {
  #reservation-msg {
    border: none;
  }
  #qr-code {
    margin: 0 auto;
  }
}
</style>
