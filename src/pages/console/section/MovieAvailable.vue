<template>
  <vuetable ref="vuetable"
    api-url="http://rmtrs.itforge.io:8888/movie/paged?page=0"
    :fields="columns"
    pagination-path=""
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'MovieAvailable',
  components: {Vuetable},
  data () {
    return {
      columns: [
        {
          name: 'en_title',
          title: 'Movie Name'
        },
        {
          name: 'release_date',
          title: 'Release Date'
        },
        {
          name: 'rate',
          title: 'Rate'
        }
      ]
    }
  }
}
</script>
