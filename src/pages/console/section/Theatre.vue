<template>
<div class="row">
  <div class="col-12">
    <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/theatre/paged?page=0"
    :fields="columns"
    :css="tableMeta"
    pagination-path="">

    <template slot="seat" slot-scope="props">
        <p class="p-2 m-0">{{ seatCapacity(props) }}</p>
    </template>

    <template slot="status" slot-scope="props">
      <div class="center-row theatre-status text-center">
        <p class="p-2 active m-1" v-if="props.rowData.active">Active</p>
        <p class="p-2 n-active m-1" v-else>Not Active</p>
      </div>
    </template>

    <template slot="action" slot-scope="props">
      <div class="text-center">
        <router-link tag="button" class="btn m-1 center-row" style="color: blue" :to="'theatre/detail/'+props.rowData.id">Detail</router-link>
        <button @click="activeMode" class="btn m-1 center-row" style="color: red">{{ activeText }}</button>
      </div>
    </template>

  </vuetable>
  </div>
  <div class="add-btn">
    <span>+</span>
  </div>
</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'Theatre',
  components: {Vuetable},
  data () {
    return {
      tableMeta: {
        tableClass: 'table table-striped table-spread'
      },
      columns: [
        {
          name: 'name',
          title: 'Theatre',
          dataClass: 'p-2 center-row'
        },
        {
          name: '__slot:seat',
          title: 'Capacity (Seat)'
        },
        {
          name: '__slot:status',
          title: 'Status',
          titleClass: 'text-center'
        },
        {
          name: '__slot:action',
          title: 'Action',
          titleClass: 'text-center'
        }
      ]
    }
  },
  methods: {
    seatCapacity (seats) {
      return seats.rowData.seats.length
    },
    activeMode (el) {
      console.log(el)
    }
  },
  computed: {
    activeText (state) {
      if (state) {
        return 'Suspect'
      } else {
        return 'Active'
      }
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
