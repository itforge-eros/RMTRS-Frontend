<template>
  <div class="wall">
    <div class="container">
      <div id="chair" class="row">
        <div class="col-12 col-lg-8" id="chair-bg">
          <div class="date col-12">
            Date Placeholder
          </div>
          <div class="screen col-12">
            Screen
          </div>
          <div id="chair-place">
            <div class="row chair-place" v-for="(row, index) in rows" :key="index">
              <span class="row-letter">{{ row }}</span>
              <div class="chairs" v-for="column in 10" :key="column">
                <img @click="handleChairClick(row, column)"
                :class="['chair',
                {'selectable': seats[row + column].mode === 0},
                {'this-reserving': seats[row + column].mode === 1},
                {'others-reserving': seats[row + column].mode === 2},
                {'reserved': seats[row + column].mode === 3}]" src="../assets/chair.png" alt="">
              </div>
              <span class="row-letter">{{ row }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 count-detail">
          <selection-detail :selectedSeats="selectedSeats" :theatre="theatre" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieHero from '../components/MovieHero'
import SelectionDetail from '../components/SelectionDetail'
import facade from '../facades/SeatFacade'
export default {
  name: 'Seat',
  components: {MovieHero, SelectionDetail},
  data () {
    return {
      selectedSeats: [],
      rows: [],
      theatre: null,
      seats: {}
    }
  },
  mounted: function () {
    this.fetchSeats()
  },
  methods: {
    handleChairClick (row, column) {
      console.log(row + column + ': ' + this.seats[row + column].mode)
      if (this.seats[row + column].mode === 0) {
        this.seats[row + column].mode = 1
        this.selectedSeats.push(this.seats[row + column])
      } else if (this.seats[row + column].mode === 1) {
        this.seats[row + column].mode = 0
        this.$delete(this.selectedSeats, this.selectedSeats.indexOf(this.seats[row + column]))
      }
    },
    fetchSeats () {
      facade
        .getSeatsAndTheatre(this.$route.params.screeningId)
        .then(({data}) => {
          this.rows = [...new Set(data.seats.map(seat => seat.row))].sort()
          this.theatre = data.name
          this.seats = data.seats
            .map(seat => {
              seat.mode = 0
              return seat
            })
            .reduce((obj, seat) => { // Convert array to object that has row+number (ex. A1, A3) as a key
              obj[seat.row + seat.number] = seat
              return obj
            }, {})
        })
        .catch(console.log)
    }
  },
  created () {
    this.screeningId = this.$route.params.screeningId
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#chair-bg {
  background-color: rgba($color: $main-white, $alpha: 0.18);
  margin: 5px 0 5px;
  padding: 1em;
  border-radius: $main-round;
  box-shadow: $main-shadow;
}
#chair {
  overflow-x: auto;
  padding: 20px;
  .date {
    background-color: rgba($color: $main-blue, $alpha: 1);
    padding: 1em;
    border-radius: $main-round;
    box-shadow: $main-shadow;
    color: #ffffff;
    width: 100%;
  }
  .row-letter {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 6px
  }
}
#chair-place {
  overflow-x: auto;
}
.chair-place {
  width: 550px;
  margin: 0 auto;
  overflow-x: auto;
}
.chairs {
  filter: brightness(1.3);
  margin: 10px 0;
  .chair {
    padding: 3px;
    width: 50px;
    filter: hue-rotate(0deg);
  }
  .selectable {
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
    filter: brightness(1.5) hue-rotate(250deg);
    &:hover {
      filter: brightness(2) hue-rotate(250deg);
    }
  }
  .others-reserving {
    cursor: not-allowed;
    filter: brightness(1.5) hue-rotate(90deg);
    &:hover {
      filter: brightness(2);
    }
  }
}

@media screen and (max-width: 992px) {
  .count-detail {
    padding: 0!important;
  }
}

.screen {
  text-align: center;
  padding: 5px 0;
  background-color: rgba($color: $main-yellow, $alpha: 1);
  border-radius: $main-round;
  margin-top: 10px;
  margin-bottom: 40px;
}
</style>
