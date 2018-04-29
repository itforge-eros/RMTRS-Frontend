<template>
  <div @click="extend = !extend" class="wall">
    <v-popover @hide="disposeCSS" offset="5">
      <div :class="['chair tooltip-target b3', {'focus': extend}]">
        <img src="../../assets/chair.png" alt="">
        <p>{{ seatKey }}</p>
      </div>

      <template slot="popover">
        <h5>{{ seatKey }}'s config</h5>
        <div class="form-group col-12 mt-3">
          <label for="type">Theatre</label>
          <select class="form-control" id="type" v-model="seat.seat_type">
            <option disabled>...</option>
            <option :selected="data.id === seat.seat_type.id" :value="data" v-for="data in seatType" :key="data.id">{{ data.name }}</option>
          </select>
        </div>
        <button class="btn btn-info">Commit</button>
      </template>

    </v-popover>
  </div>
</template>

<script>
import theatreEditorFacade from '@/facades/TheatreEditorFacade'
export default {
  name: 'Chair',
  props: ['seat'],
  data () {
    return {
      extend: false,
      seatType: null
    }
  },
  mounted () {
    this.fetchSeatType()
  },
  computed: {
    seatKey () {
      return this.seat.row + this.seat.number
    }
  },
  methods: {
    fetchSeatType () {
      theatreEditorFacade.getSeatType()
        .then(({data}) => {
          this.seatType = data
        })
    },
    disposeCSS () {
      this.extend = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wall {
  display: block;
  position: relative;
  .chair {
    width: 50px;
    margin: 0.25rem;
    filter: brightness(0.6);
    transition: 0.1s ease;
    &.focus {
      filter: brightness(1);
      transform: scale(1.1);
    }
    img {
      width: 100%;
    }
    p {
      text-align: center
    }
  }
}
</style>
