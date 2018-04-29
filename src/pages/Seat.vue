<template>
  <div class="wall">
    <div class="container">
      <div id="chair" class="row">
        <div class="col-12 col-lg-8" id="chair-bg">
          <div class="date col-12">
            Please select your seats.
          </div>
          <div class="screen col-12">
            Screen
          </div>
          <div id="chair-place">
            <div class="row chair-place" v-for="(row, index) in rows" :key="index">
              <span class="row-letter">{{ row }}</span>
              <div class="chairs" v-for="column in 10" :key="column">
                <img @click="handleChairClick(row, column)"
                :class="['chair', seatClass(seats[row + column])]" src="../assets/chair.png" alt="">
              </div>
              <span class="row-letter">{{ row }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 count-detail">
          <selection-detail
            :selectedSeats="mySelectedSeats"
            :theatre="theatre"
            :screeningId="screeningId"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieHero from '../components/MovieHero'
import SelectionDetail from '../components/SelectionDetail'
import facade from '../facades/SeatFacade'
import { db } from '../config/firebase.config'
export default {
  name: 'Seat',
  components: {MovieHero, SelectionDetail},
  data () {
    return {
      mySelectedSeats: [],
      mySelectedSeatsFbKeys: {},
      rows: [],
      theatre: null,
      seats: {},
      screeningId: this.$route.params.screeningId
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.mySelectedSeats.length === 0) {
      next() // No selected seat, you are free to go!
      return
    }
    if (to.name === 'Payment') {
      next()
      return
    }
    const answer = window.confirm('Do you really want to leave? Your selected seat will be deleted.')
    if (answer) {
      Object.values(this.mySelectedSeatsFbKeys).forEach((key) => {
        this.$firebaseRefs.allSelectedSeats.child(key).remove()
      })
      next()
    } else {
      next(false)
    }
  },
  computed: {
    allReservedSeatsIdList () {
      return this.allReservedSeats.map(seat => seat['.value'])
    },
    allSelectedSeatsIdList () {
      return this.allSelectedSeats.map(seat => seat['.value'])
    }
  },
  firebase () {
    return {
      allReservedSeats: db.ref(`screenings/${this.screeningId}/reservedList`),
      allSelectedSeats: db.ref(`screenings/${this.screeningId}/selectedList`)
    }
  },
  mounted () {
    this.fetchSeats()
  },
  methods: {
    handleChairClick (row, column) {
      const seat = this.seats[row + column]
      if (!this.mySelectedSeats.includes(seat)) {
        if (this.allSelectedSeatsIdList.includes(seat.id)) return
        this.mySelectedSeats.push(seat)
        const ref = this.$firebaseRefs.allSelectedSeats.push() // push in firebase
        ref.set(seat.id)
        this.mySelectedSeatsFbKeys[seat.id] = ref.key
      } else {
        this.$delete(this.mySelectedSeats, this.mySelectedSeats.indexOf(seat))
        this.$firebaseRefs.allSelectedSeats.child(this.mySelectedSeatsFbKeys[seat.id]).remove() // remove in firebase
      }
    },
    fetchSeats () {
      facade
        .getSeatsAndTheatre(this.$route.params.screeningId)
        .then(({rows, theatre, seats}) => {
          this.rows = rows
          this.theatre = theatre
          this.seats = seats
        })
    },
    isSelectable (seat) {
      return !this.allReservedSeatsIdList.includes(seat.id) &&
      !this.allSelectedSeatsIdList.includes(seat.id) &&
      !this.mySelectedSeats.includes(seat.id)
    },
    isSelfSelected (seat) {
      return this.mySelectedSeats.includes(seat) && !this.allReservedSeatsIdList.includes(seat.id)
    },
    isOtherSelected (seat) {
      return !this.mySelectedSeats.includes(seat) && this.allSelectedSeatsIdList.includes(seat.id)
    },
    isReserved (seat) {
      return this.allReservedSeatsIdList.includes(seat.id) && this.allSelectedSeatsIdList.includes(seat.id)
    },
    seatClass (seat) {
      if (this.isSelectable(seat)) return 'selectable'
      else if (this.isSelfSelected(seat)) return 'this-reserving'
      else if (this.isOtherSelected(seat)) return 'others-reserving'
      else if (this.isReserved) return 'reserved'
      else {
        console.log('You failed')
      }
    }
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
    color: red;
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
