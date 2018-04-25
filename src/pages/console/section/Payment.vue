<template>
  <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/reserve/paged?page=0"
    :fields="columns"
    pagination-path="">
    <template slot="payment" slot-scope="props">
      <a class="payment-btn" target="_blank" :href="'#/payment/' + props.rowData.id">Pay</a>
    </template>
  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'
export default {
  name: 'Payment',
  components: {Vuetable},
  data () {
    return {
      columns: [
        {
          name: 'id',
          title: 'ID',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'reserved_time',
          title: 'Reserved Time',
          callback: 'formatTime'
        },
        {
          name: 'tickets',
          title: 'Ticket ID(s)',
          callback: 'formatTicketID'
        },
        {
          name: 'tickets',
          title: 'Seat(s)',
          callback: 'formatTicketSeat'
        },
        {
          name: 'is_checked_in',
          title: 'Check In',
          titleClass: 'text-center',
          dataClass: 'text-center status',
          callback: 'formatStatus'
        },
        {
          name: '__slot:payment',
          title: 'Payment'
        }
      ]
    }
  },
  methods: {
    formatTicketID (value) {
      let id = []
      value.map(function (value, key) {
        id.push(value.id)
      })
      return id.join(' ,')
    },
    formatTicketSeat (value) {
      let seat = []
      value.map(function (value, key) {
        seat.push(value.seat.row + value.seat.number)
      })
      return seat.join(' ,')
    },
    formatStatus (value) {
      if (value) {
        return '<span class="ch-yes">Yes</span>'
      }
      return '<span class="ch-no">No</span>'
    },
    formatTime (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY HH:mm')
    }
  }
}
</script>

<style lang="scss">
.status {
  span {
    padding: 0.5em 1em;
    border-radius: $main-round;
    color: #ffffff;
  }
  .ch-yes {
    background-color: rgb(19, 126, 19);
  }
  .ch-no {
    background-color: rgb(145, 43, 43);
  }
}
.payment-btn {
  padding: 0.5em 1em;
  border-radius: $main-round;
  background-color: #3e71b3;
  color: #ffffff;
  &:hover {
    text-decoration: none;
    color: #ffffff;
  }
}
</style>
