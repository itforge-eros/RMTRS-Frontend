<template>
  <div class="wall">
    <movie-hero
    img="http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/2017/04/gotg2.jpg?itok=YoxtpMx9"
    title="Guardians Of The Galaxy 2"
    description="Peter Quill and his fellow Guardians are hired by a powerful alien race, the Sovereign, to protect their precious batteries from invaders. When it is discovered that Rocket has stolen the items they were sent to guard, the Sovereign dispatch their armada to search for vengeance. As the Guardians try to escape, the mystery of Peter's parentage is revealed." />
    <div class="container">
      <div id="chair">
        <div class="row" v-for="(row, index) in seats" :key="index">
          <div class="chairs" v-for="seat in row" :key="seat.id">
            <img class="chair" src="../assets/chair.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieHero from '../components/MovieHero'
export default {
  name: 'Seat',
  components: {MovieHero},
  data () {
    return {
      seats: [
        [
          {id: '1', row: 'A', column: '1'},
          {id: '2', row: 'A', column: '2'},
          {id: '3', row: 'A', column: '3'},
          {id: '4', row: 'A', column: '4'},
          {id: '5', row: 'A', column: '5'},
          {id: '6', row: 'A', column: '6'},
          {id: '7', row: 'A', column: '7'},
          {id: '8', row: 'A', column: '8'},
          {id: '9', row: 'A', column: '9'},
          {id: '10', row: 'B', column: '10'}
        ],
        [
          {id: '11', row: 'B', column: '1'},
          {id: '12', row: 'B', column: '2'},
          {id: '13', row: 'B', column: '3'},
          {id: '14', row: 'B', column: '4'},
          {id: '15', row: 'B', column: '5'},
          {id: '16', row: 'B', column: '6'},
          {id: '17', row: 'B', column: '7'},
          {id: '18', row: 'B', column: '8'},
          {id: '19', row: 'B', column: '9'},
          {id: '20', row: 'B', column: '10'}
        ]
      ]
    }
  },
  mounted: function () {
    console.log(this.seats)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chairs {
  filter: brightness(1.3);
  margin: 10px 0;
  .chair {
    padding: 3px;
    width: 50px;
    &:hover {
      filter: brightness(2);
    }
  }
  .reserved {
    filter: grayscale(1)!important;
    cursor: not-allowed;
    opacity: 0.3;
  }
  .this-reserving {
    cursor: not-allowed;
    animation: this-reserving 0.7s ease infinite;
  }
  .others-reserving {
    cursor: not-allowed;
    animation: others-reserving 0.7s ease infinite;
  }
}

@keyframes this-reserving {
  0% {filter: brightness(1.0) hue-rotate(250deg)}
  50% {filter: brightness(1.5) hue-rotate(250deg)}
  100% {filter: brightness(1.0) hue-rotate(250deg)}
}
@keyframes others-reserving {
  0% {filter: brightness(1.0) hue-rotate(90deg)}
  50% {filter: brightness(1.5) hue-rotate(90deg)}
  100% {filter: brightness(1.0) hue-rotate(90deg)}
}

</style>
