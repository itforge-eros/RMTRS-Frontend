<template>
  <div id="editor">
    <div class="row">
      <div class="col-12">
        <h3 class="header py-2 px-4 mb-3">แก้ไขรอบฉายภาพยนตร์</h3>
      </div>
    </div>
    <form v-if="screening !== null">
      <div class="row">
        <div :class="formMeta[key][1]" v-if="!exclude.includes(key) && formMeta[key][2] === 'date'" v-for="(data, key) in screening" :key="data.id">
          <label :for="key">{{ formMeta[key][0] }}</label>
          <datepicker :inline="true" wrapper-class="box-datepicker" calendar-class="design mx-auto" input-class="form-control read-only-except" :id="key"
            v-model="screening[key]" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <h4 class="header py-2 px-4 mb-3">ข้อมูลภาพยนตร์</h4>
        </div>
        <div v-for="(meta, key) in formMeta" :key="key" v-if="meta[2] === 'read-only'" :class="meta[1]">
          <label :for="key">{{ meta[0] }}</label>
          <input disabled class="form-control" :id="key" v-model="screening.movie[key]" re/>
        </div>
      </div>
      <div class="row mb-1 mt-5">
        <div class="col-12">
          <button class="float-right btn btn-block">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import screeningEditorFacade from '@/facades/ScreeningEditorFacade'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'ScreeningEditor',
  components: {Datepicker},
  data () {
    return {
      formMeta: {
        show_date: ['วันที่ฉาย', 'form-group col-12 col-md-6', 'date'],
        show_time: ['เวลาที่ฉาย', 'form-group col-12 col-md-6', 'date'],
        th_title: ['ชื่อไทย', 'form-group col-12 col-sm-6', 'read-only'],
        en_title: ['English Title', 'form-group col-12 col-sm-6', 'read-only'],
        release_date: ['Release Date', 'form-group col-12 col-md-3', 'read-onlydate'],
        end_date: ['End Date', 'form-group col-12 col-md-3', 'read-only'],
        duration: ['Duration', 'form-group col-6 col-sm-3', 'read-only'],
        rate: ['Rate', 'form-group col-3', 'read-only']
      },
      exclude: ['active', 'movie', 'theatre', 'id'],
      screening: null
    }
  },
  mounted () {
    this.fetchScreening()
  },
  methods: {
    fetchScreening () {
      screeningEditorFacade.getScreening(this.$route.params.id)
        .then(({data}) => {
          this.screening = data
        })
        .catch(console.log)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
