<template>
<div class="row" v-if="accountRights !== null">
  <div class="col-12">
    <vuetable ref="vuetable"
    :api-url="`${API_URL}/theatre/paged?page=0`"
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
      <div v-if="accountRights.write" class="text-center">
        <router-link tag="button" :to="{name: 'TheatreEditor', params: {id: props.rowData.id}}" class="btn m-1 center-row" style="color: blue">Edit</router-link>
        <!-- <button @click="activeMode(props.rowData.id)" class="btn m-1 center-row" style="color: red">{{ activeText }}</button> -->
      </div>
      <div v-else class="text-center">
        <router-link tag="button" :to="'theatre/view/'+props.rowData.id" class="btn m-1 center-row" style="color: green">View</router-link>
      </div>
    </template>

  </vuetable>
  </div>
  <router-link v-if="accountRights.write" tag="div" :to="{name: 'Add Theatre'}" class="add-btn">
    <span>+</span>
  </router-link>
</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import { mapGetters } from 'vuex'
import { API_URL } from '@/config/constants'
export default {
  name: 'Theatre',
  components: {Vuetable},
  data () {
    return {
      API_URL,
      accountRights: null,
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
          titleClass: 'table-action text-center',
          dataClass: 'text-right'
        }
      ]
    }
  },
  mounted () {
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).theatre
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
        return 'Close'
      } else {
        return 'Active'
      }
    },
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
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
