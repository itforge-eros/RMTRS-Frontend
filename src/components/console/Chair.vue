<template>
  <div @click="extend = !extend" v-if="accountRights !== null" class="wall">
    <v-popover @hide="disposeCSS" offset="5">
      <div :class="['chair tooltip-target b3', {'focus': extend}]">
        <span :class="['type text-muted', {'huge': extend}]">{{ seat.seat_type.name }}</span>
        <img src="../../assets/chair.png" alt="">
        <p>{{ seatKey }}</p>
      </div>

      <template slot="popover">
        <h5>{{ seatKey }}'s config</h5>
        <div class="form-group col-12 mt-3">
          <label for="type">Seat Type</label>
          <select :disabled="!accountRights.write" class="form-control" id="type" v-model="seat.seat_type">
            <option disabled>...</option>
            <option :selected="data.id === seat.seat_type.id" :value="data" v-for="data in seatType" :key="data.id">{{ data.name }}</option>
          </select>
        </div>
        <button v-close-popover v-if="!mode && accountRights.write" @click="changeType" class="btn btn-info">Commit</button>
      </template>

    </v-popover>
  </div>
</template>

<script>
import theatreEditorFacade from '@/facades/TheatreEditorFacade'
import { mapGetters } from 'vuex'
import axios from '@/config/axios.config'
export default {
  name: 'Chair',
  props: ['seat', 'mode'],
  data () {
    return {
      extend: false,
      seatType: null,
      accountRights: null,
      open: true
    }
  },
  mounted () {
    this.fetchSeatType()
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).theatre
  },
  computed: {
    seatKey () {
      return this.seat.row + this.seat.number
    },
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
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
    },
    changeType () {
      const payload = {
        seat_type_id: this.seat.seat_type.id,
        row: this.seat.row,
        number: this.seat.number
      }
      axios.put(`/seat/${this.seat.id}`, payload)
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
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
    .type {
      font-size: 0.7em;
      text-align: center;
      width: 100%;
      display: block;
      transition: 0.5 ease;
      border: 1px solid rgba(255, 255, 255, 0);
    }
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
.huge {
  transform: scale(1.4) translateY(-10px);
  background-color: $main-blue;
  color: $main-yellow!important;
  border: 1px solid #fff!important;
  border-radius: $main-round;
}
</style>
