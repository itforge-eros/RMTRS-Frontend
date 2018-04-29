<template>
<div class="row" v-if="accountRights !== null">
  <div class="col-12">
    <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/screening/paged?page=0"
    :fields="columns"
    :css="tableMeta"
    pagination-path="">

    <template slot="title" slot-scope="props">
      <p class="m-0">{{ props.rowData.movie.en_title }}<br>{{ props.rowData.movie.th_title }}</p>
    </template>

    <template slot="action" slot-scope="props">
      <div v-if="accountRights.write">
        <router-link tag="button" style="color: blue" class="btn" :to="'screening/edit/'+props.rowData.id">Edit</router-link>
        <router-link tag="button" style="color: red" class="btn" :to="'screening/delete/'+props.rowData.id">Delete</router-link>
      </div>
      <div v-else>
        <router-link tag="button" style="color: green" class="btn" :to="'screening/view/'+props.rowData.id">View</router-link>
      </div>
    </template>
  </vuetable>
  </div>
  <router-link v-if="accountRights.write" tag="div" :to="{name: 'Add Screening'}" class="add-btn">
    <span>+</span>
  </router-link>
</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'Screening',
  components: {Vuetable},
  data () {
    return {
      accountRights: null,
      tableMeta: {
        tableClass: 'table table-striped'
      },
      columns: [
        {
          name: 'show_time',
          title: 'Showtime',
          callback: 'formatShowtime',
          dataClass: 'center-row'
        },
        {
          name: 'theatre.name',
          title: 'Theatre',
          titleClass: 'text-center',
          dataClass: 'text-center center-row'
        },
        {
          name: '__slot:title',
          title: 'In This Theatre',
          dataClass: 'center-row'
        },
        {
          name: '__slot:action',
          title: 'Action',
          titleClass: 'text-center',
          dataClass: 'text-center center-row'
        }
      ]
    }
  },
  mounted () {
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).screening
  },
  methods: {
    formatShowtime (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY HH:mm')
    }
  },
  computed: {
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  }
}
</script>
