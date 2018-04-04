<template>
  <div class="wall">
    <movie-hero
    img="http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/2017/04/gotg2.jpg?itok=YoxtpMx9"
    title="Guardians Of The Galaxy 2"
    description="Peter Quill and his fellow Guardians are hired by a powerful alien race, the Sovereign, to protect their precious batteries from invaders. When it is discovered that Rocket has stolen the items they were sent to guard, the Sovereign dispatch their armada to search for vengeance. As the Guardians try to escape, the mystery of Peter's parentage is revealed." />
    <div class="container">
      <div id="chair" class="row">
        <div class="col-12 col-lg-8" id="chair-bg">
          <div class="date col-12">
            Date Placeholder
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
        <div class="col-12 col-lg-4">
          <selection-detail :count="selectedSeats.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieHero from '../components/MovieHero'
import SelectionDetail from '../components/SelectionDetail'
export default {
  name: 'Seat',
  components: {MovieHero, SelectionDetail},
  data () {
    return {
      selectedSeats: [],
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      seats: {
        A1: {id: '1', row: 'A', column: 1, mode: 0},
        A2: {id: '2', row: 'A', column: 2, mode: 0},
        A3: {id: '3', row: 'A', column: 3, mode: 0},
        A4: {id: '4', row: 'A', column: 4, mode: 0},
        A5: {id: '5', row: 'A', column: 5, mode: 0},
        A6: {id: '6', row: 'A', column: 6, mode: 0},
        A7: {id: '7', row: 'A', column: 7, mode: 0},
        A8: {id: '8', row: 'A', column: 8, mode: 0},
        A9: {id: '9', row: 'A', column: 9, mode: 0},
        A10: {id: '10', row: 'A', column: 10, mode: 0},
        B1: {id: '11', row: 'B', column: 1, mode: 0},
        B2: {id: '12', row: 'B', column: 2, mode: 0},
        B3: {id: '13', row: 'B', column: 3, mode: 0},
        B4: {id: '14', row: 'B', column: 4, mode: 0},
        B5: {id: '15', row: 'B', column: 5, mode: 0},
        B6: {id: '16', row: 'B', column: 6, mode: 0},
        B7: {id: '17', row: 'B', column: 7, mode: 0},
        B8: {id: '18', row: 'B', column: 8, mode: 0},
        B9: {id: '19', row: 'B', column: 9, mode: 0},
        B10: {id: '20', row: 'B', column: 10, mode: 0},
        C1: {id: '21', row: 'C', column: 1, mode: 0},
        C2: {id: '22', row: 'C', column: 2, mode: 0},
        C3: {id: '23', row: 'C', column: 3, mode: 0},
        C4: {id: '24', row: 'C', column: 4, mode: 0},
        C5: {id: '25', row: 'C', column: 5, mode: 0},
        C6: {id: '26', row: 'C', column: 6, mode: 0},
        C7: {id: '27', row: 'C', column: 7, mode: 0},
        C8: {id: '28', row: 'C', column: 8, mode: 0},
        C9: {id: '29', row: 'C', column: 9, mode: 0},
        C10: {id: '30', row: 'C', column: 10, mode: 0},
        D1: {id: '31', row: 'D', column: 1, mode: 0},
        D2: {id: '32', row: 'D', column: 2, mode: 0},
        D3: {id: '33', row: 'D', column: 3, mode: 0},
        D4: {id: '34', row: 'D', column: 4, mode: 0},
        D5: {id: '35', row: 'D', column: 5, mode: 0},
        D6: {id: '36', row: 'D', column: 6, mode: 0},
        D7: {id: '37', row: 'D', column: 7, mode: 0},
        D8: {id: '38', row: 'D', column: 8, mode: 0},
        D9: {id: '39', row: 'D', column: 9, mode: 0},
        D10: {id: '40', row: 'D', column: 10, mode: 0},
        E1: {id: '41', row: 'E', column: 1, mode: 0},
        E2: {id: '42', row: 'E', column: 2, mode: 0},
        E3: {id: '43', row: 'E', column: 3, mode: 0},
        E4: {id: '44', row: 'E', column: 4, mode: 0},
        E5: {id: '45', row: 'E', column: 5, mode: 0},
        E6: {id: '46', row: 'E', column: 6, mode: 0},
        E7: {id: '47', row: 'E', column: 7, mode: 0},
        E8: {id: '48', row: 'E', column: 8, mode: 0},
        E9: {id: '49', row: 'E', column: 9, mode: 0},
        E10: {id: '50', row: 'E', column: 10, mode: 0},
        F1: {id: '51', row: 'F', column: 1, mode: 0},
        F2: {id: '52', row: 'F', column: 2, mode: 0},
        F3: {id: '53', row: 'F', column: 3, mode: 0},
        F4: {id: '54', row: 'F', column: 4, mode: 0},
        F5: {id: '55', row: 'F', column: 5, mode: 0},
        F6: {id: '56', row: 'F', column: 6, mode: 0},
        F7: {id: '57', row: 'F', column: 7, mode: 0},
        F8: {id: '58', row: 'F', column: 8, mode: 0},
        F9: {id: '59', row: 'F', column: 9, mode: 0},
        F10: {id: '60', row: 'F', column: 10, mode: 0},
        G1: {id: '61', row: 'G', column: 1, mode: 0},
        G2: {id: '62', row: 'G', column: 2, mode: 0},
        G3: {id: '63', row: 'G', column: 3, mode: 0},
        G4: {id: '64', row: 'G', column: 4, mode: 0},
        G5: {id: '65', row: 'G', column: 5, mode: 0},
        G6: {id: '66', row: 'G', column: 6, mode: 0},
        G7: {id: '67', row: 'G', column: 7, mode: 0},
        G8: {id: '68', row: 'G', column: 8, mode: 0},
        G9: {id: '69', row: 'G', column: 9, mode: 0},
        G10: {id: '70', row: 'G', column: 10, mode: 0},
        H1: {id: '71', row: 'H', column: 1, mode: 0},
        H2: {id: '72', row: 'H', column: 2, mode: 0},
        H3: {id: '73', row: 'H', column: 3, mode: 0},
        H4: {id: '74', row: 'H', column: 4, mode: 0},
        H5: {id: '75', row: 'H', column: 5, mode: 0},
        H6: {id: '76', row: 'H', column: 6, mode: 0},
        H7: {id: '77', row: 'H', column: 7, mode: 0},
        H8: {id: '78', row: 'H', column: 8, mode: 0},
        H9: {id: '79', row: 'H', column: 9, mode: 0},
        H10: {id: '80', row: 'H', column: 10, mode: 0},
        I1: {id: '81', row: 'I', column: 1, mode: 0},
        I2: {id: '82', row: 'I', column: 2, mode: 0},
        I3: {id: '83', row: 'I', column: 3, mode: 0},
        I4: {id: '84', row: 'I', column: 4, mode: 0},
        I5: {id: '85', row: 'I', column: 5, mode: 0},
        I6: {id: '86', row: 'I', column: 6, mode: 0},
        I7: {id: '87', row: 'I', column: 7, mode: 0},
        I8: {id: '88', row: 'I', column: 8, mode: 0},
        I9: {id: '89', row: 'I', column: 9, mode: 0},
        I10: {id: '90', row: 'I', column: 10, mode: 0},
        J1: {id: '91', row: 'J', column: 1, mode: 0},
        J2: {id: '92', row: 'J', column: 2, mode: 0},
        J3: {id: '93', row: 'J', column: 3, mode: 0},
        J4: {id: '94', row: 'J', column: 4, mode: 0},
        J5: {id: '95', row: 'J', column: 5, mode: 0},
        J6: {id: '96', row: 'J', column: 6, mode: 0},
        J7: {id: '97', row: 'J', column: 7, mode: 0},
        J8: {id: '98', row: 'J', column: 8, mode: 0},
        J9: {id: '99', row: 'J', column: 9, mode: 0},
        J10: {id: '100', row: 'J', column: 10, mode: 0}
      }
    }
  },
  mounted: function () {
    console.log(this.seats)
  },
  methods: {
    handleChairClick (row, column) {
      console.log(row + column + ': ' + this.seats[row + column].mode)
      if (this.seats[row + column].mode === 0) {
        this.seats[row + column].mode = 1
        this.selectedSeats.push(row + column)
      } else if (this.seats[row + column].mode === 1) {
        this.seats[row + column].mode = 0
        this.$delete(this.selectedSeats, this.selectedSeats.indexOf(row + column))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#chair-bg {
  background-color: rgba($color: $main-white, $alpha: 0.18);
  margin: 5px 0 40px;
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

</style>
