<template>
  <div id="selection-detail">
    <div class="theater col-12">
      Theatre {{ theatre }}
    </div>
    <div class="seat-count col-12">
        <p>Total Price</p>
        <h1>{{ totalPrice }}</h1>
    </div>
    <div class="total col-12">
      <p>Total Seats : {{ selectedSeats.length }}</p>
    </div>
    <div class="payment col-12">
      <div class="row">
        <div class="text col-10">
          <p>Process the payment</p>
        </div>
        <div class="arrow col-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionDetail',
  props: ['selectedSeats', 'theatre'],
  data () {
    return {
      price: 180
    }
  },
  computed: {
    totalPrice () {
      return this.selectedSeats.reduce((sum, seat) => {
        sum += seat.seat_type.price
        return sum
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
#selection-detail {
  background-color: rgba($color: $main-white, $alpha: 0.18);
  margin: 5px 0 40px;
  padding: 1em;
  border-radius: $main-round;
  box-shadow: $main-shadow;
}
.theater {
  background-color: rgba($color: $main-blue, $alpha: 1);
  padding: 1em;
  border-radius: $main-round;
  box-shadow: $main-shadow;
  color: #ffffff;
}
.seat-count {
  text-align: center;
  p {
    font-size: 1.3em;
  }
  h1 {
    font-size: 3em;
  }
}
.payment {
  border-radius: $main-round;
  overflow: hidden;
  .text {
    background-color: rgba($color: $main-blue, $alpha: 1);
    color: #ffffff;
    p {
      padding: 5px 10px;
    }
  }
  .arrow {
    background-color: rgba($color: $main-yellow, $alpha: 1);
  }
}
</style>
