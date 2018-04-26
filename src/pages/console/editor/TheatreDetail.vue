<template>
<div id="editor" v-if="theatre !== null">
  <div class="row">
    <div class="col">
      <h3 class="header py-2 px-4">ข้อมูลโรงฉายภาพยนตร์ <span class="float-right">{{ theatre.name }}</span></h3>
    </div>
  </div>
  <div class="row">
    <div class="col-6"><h3></h3></div>
  </div>
</div>
</template>

<script>
import theatreEditorFacade from '@/facades/TheatreEditorFacade'
export default {
  name: 'TheatreDetail',
  data () {
    return {
      theatre: null
    }
  },
  mounted () {
    this.fetchTheatre(this.$route.params.id)
  },
  methods: {
    fetchTheatre (id) {
      theatreEditorFacade.getTheatre(id)
        .then(({data}) => {
          this.theatre = data
        })
        .catch(console.log)
    }
  }
}
</script>
