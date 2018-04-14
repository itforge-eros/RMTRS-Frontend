<template>
  <vuetable ref="vuetable"
    api-url="http://localhost:8888/movie/available"
    :fields="columns"
    pagination-path=""
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
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
          title: 'เข้าฉาย'
        }
      ]
    }
  }
}
</script>
