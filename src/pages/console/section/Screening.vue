<template>
  <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/screening/paged?page=0"
    :fields="columns"
    :css="tableMeta"
    pagination-path="">

    <template slot="title" slot-scope="props">
      <p>{{ props.rowData.movie.en_title }}<br>{{ props.rowData.movie.th_title }}</p>
    </template>

    <template slot="action" slot-scope="props">
      <router-link tag="button" style="color: blue" class="btn" :to="'screening/edit/'+props.rowData.id">Edit</router-link>
    </template>

  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'
export default {
  name: 'Screening',
  components: {Vuetable},
  data () {
    return {
      tableMeta: {
        tableClass: 'table table-striped'
      },
      columns: [
        {
          name: 'show_time',
          title: 'Showtime',
          callback: 'formatShowtime'
        },
        {
          name: 'theatre.name',
          title: 'Theatre',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: '__slot:title',
          title: 'In This Theatre'
        },
        {
          name: '__slot:action',
          title: 'Action',
          titleClass: 'text-center',
          dataClass: 'text-center'
        }
      ]
    }
  },
  methods: {
    formatShowtime (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY HH:MM')
    }
  }
}
</script>
