<template>
  <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/theatre/paged?page=0"
    :fields="columns"
    pagination-path="">

    <template slot="seat" slot-scope="props">
        <p>{{ seatCapacity(props) }}</p>
    </template>

    <template slot="status" slot-scope="props">
      <div class="theatre-status text-center">
        <p class="active" v-if="props.rowData.active">Active</p>
        <p class="n-active" v-else>Not Active</p>
      </div>
    </template>

  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'Theatre',
  components: {Vuetable},
  mounted () {
    this.$refs.vuetable.toggleDetailRow(1)
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          title: 'Theatre'
        },
        {
          name: '__slot:seat',
          title: 'Capacity (Seat)'
        },
        {
          name: '__slot:status',
          title: 'Status'
        }
      ]
    }
  },
  methods: {
    seatCapacity (seats) {
      return seats.rowData.seats.length
    }
  }
}
</script>

<style lang="scss">
.theatre-status {
  color: #ffffff;
  .active {
    background-color: rgb(19, 126, 19);
    border-radius: $main-round;
  }
  .n-active {
    background-color: rgb(145, 43, 43);
    border-radius: $main-round;
  }
}
</style>
