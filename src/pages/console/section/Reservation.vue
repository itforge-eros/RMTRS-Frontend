<template>
  <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/reserve/paged?page=0"
    :fields="columns"
    :css="tableMeta"
    pagination-path="">
    <template slot="action" slot-scope="props">
      <a class="btn m-1 btn-info" target="_blank" :href="'#/reservation/' + props.rowData.id">Detail</a>
      <button @click="handleCheckin(props.rowData)" class="btn m-1">{{ checkinText(props.rowData.is_checked_in) }}</button>
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
      tableMeta: {
        tableClass: 'table table-striped table-spread'
      },
      columns: [
        {
          name: 'id',
          title: 'ID',
          titleClass: 'text-center',
          dataClass: 'text-center center-row'
        },
        {
          name: 'reserved_time',
          title: 'Reserved Time',
          callback: 'formatTime',
          dataClass: 'center-row'
        },
        {
          name: 'tickets',
          title: 'Ticket ID(s)',
          callback: 'formatTicketID',
          dataClass: 'center-row'
        },
        {
          name: 'tickets',
          title: 'Seat(s)',
          callback: 'formatTicketSeat',
          dataClass: 'center-row'
        },
        {
          name: 'is_checked_in',
          title: 'Check In',
          titleClass: 'text-center',
          dataClass: 'text-center status center-row',
          callback: 'formatStatus'
        },
        {
          name: '__slot:action',
          title: 'Action',
          titleClass: 'table-action',
          dataClass: 'center-row'
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
        return 'Yes'
      }
      return 'No'
    },
    formatTime (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY HH:mm')
    },
    checkinText (state) {
      if (state) {
        return 'Un-Checkin'
      }
      return 'Checkin'
    },
    handleCheckin (data) {
      console.log(data.id)
      console.log(data.is_checked_in)
      // save to db -- do things
      data.is_checked_in = !data.is_checked_in
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
</style>
