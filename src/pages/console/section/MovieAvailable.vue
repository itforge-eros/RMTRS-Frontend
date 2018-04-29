<template>
<div v-if="accountRights !== null">
  <div class="row">
    <div class="col-12">
      <vuetable ref="vuetable"
        api-url="http://rmtrs.itforge.io:8888/movie/paged?page=0"
        :fields="columns"
        :css="tableMeta"
        pagination-path="">

        <template slot="action" slot-scope="props">
          <div v-if="accountRights.write">
            <router-link tag="button" class="btn m-1" style="color: blue" :to="'movie/edit/'+props.rowData.id">Edit</router-link>
            <router-link tag="button" class="btn m-1" style="color: red" :to="'movie/delete/'+props.rowData.id">Delete</router-link>
          </div>
          <div v-else>
            <router-link tag="button" class="btn m-1" style="color: green" :to="'movie/view/'+props.rowData.id">View</router-link>
          </div>
        </template>

      </vuetable>
    </div>
  </div>
  <router-link v-if="accountRights.write" tag="div" :to="{name: 'Add Movie'}" class="add-btn">
    <span>+</span>
  </router-link>
</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'MovieAvailable',
  components: {Vuetable},
  data () {
    return {
      accountRights: null,
      tableMeta: {
        tableClass: 'table table-striped table-spread'
      },
      columns: [
        {
          name: 'en_title',
          title: 'Movie Name',
          dataClass: 'center-row'
        },
        {
          name: 'release_date',
          title: 'Release Date',
          callback: 'formatTime',
          dataClass: 'center-row'
        },
        {
          name: 'end_date',
          title: 'End Date',
          callback: 'formatTime',
          dataClass: 'center-row'
        },
        {
          name: 'rate',
          title: 'Rate',
          dataClass: 'center-row'
        },
        {
          name: '__slot:action',
          title: 'Action',
          titleClass: 'table-action text-center',
          dataClass: 'text-center'
        }
      ]
    }
  },
  methods: {
    formatTime (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY')
    }
  },
  mounted () {
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).movie
  },
  computed: {
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  }
}
</script>
