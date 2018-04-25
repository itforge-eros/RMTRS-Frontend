<template>
  <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/movie/paged?page=0"
    :fields="columns"
    :css="tableMeta"
    pagination-path="">

    <template slot="action" slot-scope="props">
      <router-link tag="button" class="btn m-1" style="color: blue" :to="'movie/edit/'+props.rowData.id">Edit</router-link>
      <router-link tag="button" class="btn m-1" style="color: red" :to="'movie/delete/'+props.rowData.id">Delete</router-link>
    </template>

  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'
export default {
  name: 'MovieAvailable',
  components: {Vuetable},
  data () {
    return {
      tableMeta: {
        tableClass: 'table table-striped'
      },
      columns: [
        {
          name: 'en_title',
          title: 'Movie Name'
        },
        {
          name: 'release_date',
          title: 'Release Date',
          callback: 'formatTime'
        },
        {
          name: 'end_date',
          title: 'End Date',
          callback: 'formatTime'
        },
        {
          name: 'rate',
          title: 'Rate'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ]
    }
  },
  methods: {
    formatTime (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY')
    }
  }
}
</script>
