<template>
  <div id="editor">
    <div class="row">
      <div class="col-12 p-0">
        <h3 class="header py-2 px-4 mb-3">แก้ไขรอบฉายภาพยนตร์</h3>
      </div>
    </div>
    <form v-if="screening !== null">
      <div class="row">
        <div :class="formMeta[key][1]" v-if="!exclude.includes(key) && ['date','time'].includes(formMeta[key][2])" v-for="(data, key) in screening" :key="data.id">
          <label :for="key">{{ formMeta[key][0] }} {{ screening[key] }}</label>
          <datepicker v-if="formMeta[key][2] === 'date'" @input="setDateData" :inline="true" wrapper-class="box-datepicker" calendar-class="design mx-auto" input-class="form-control read-only-except" :id="key"
            :value="screening[key]" />
          <div class="timepicker mt-3 row" v-else>
            <div class="col">
              <div @click="hourHandler(true)" class="arrow-up mb-3"></div>
              <input disabled @keypress="validateHour" v-model="hour" type="text">
              <div @click="hourHandler(false)" class="arrow-down mt-3"></div>
            </div>
            <div class="col">
              <div @click="minuteHandler(true)" class="arrow-up mb-3"></div>
              <input disabled @keypress="validateMinute" v-model="minute" type="text">
              <div @click="minuteHandler(false)" class="arrow-down mt-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 p-0">
          <h4 class="header py-2 px-4 mb-3">ข้อมูลภาพยนตร์</h4>
        </div>
        <div v-for="(meta, key) in formMeta" :key="key" v-if="meta[2] === 'read-only'" :class="meta[1]">
          <label :for="key">{{ meta[0] }}</label>
          <input disabled class="form-control" :id="key" v-model="screening.movie[key]" re/>
        </div>
      </div>
      <div class="row mb-1 mt-5">
        <div class="col-12 p-0">
          <button class="float-right btn btn-block">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import screeningEditorFacade from '@/facades/ScreeningEditorFacade'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
export default {
  name: 'ScreeningEditor',
  components: {Datepicker},
  data () {
    return {
      selectedDatepicker: null,
      formMeta: {
        show_date: ['วันที่ฉาย', 'form-group col-12 col-md-6', 'date'],
        show_time: ['เวลาที่ฉาย', 'form-group col-12 col-md-6', 'time'],
        th_title: ['ชื่อไทย', 'form-group col-12 col-sm-6', 'read-only'],
        en_title: ['English Title', 'form-group col-12 col-sm-6', 'read-only'],
        release_date: ['Release Date', 'form-group col-12 col-md-3', 'read-onlydate'],
        end_date: ['End Date', 'form-group col-12 col-md-3', 'read-only'],
        duration: ['Duration', 'form-group col-6 col-sm-3', 'read-only'],
        rate: ['Rate', 'form-group col-3', 'read-only']
      },
      exclude: ['active', 'movie', 'theatre', 'id'],
      screening: null,
      time: {
        hour: 0,
        minute: 0
      }
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
          const time = moment(this.screening.show_time)
          this.time.hour = time.hour().toString()
          this.time.minute = time.minute().toString()
          this.checkTimeFormat('hour', this.time.hour)
          this.checkTimeFormat('minute', this.time.minute)
        })
        .catch(console.log)
    },
    setDateData (date) {
      this.screening.show_date = moment(date).format('YYYY-MM-DD')
      this.updateTime()
    },
    hourHandler (operation) {
      let data
      if (operation) {
        data = Math.min(23, this.hour + 1)
      } else {
        data = Math.max(0, this.hour - 1)
      }
      this.checkTimeFormat('hour', data)
      this.updateTime()
    },
    minuteHandler (operation) {
      let data
      if (operation) {
        data = Math.min(55, this.minute + 5)
      } else {
        data = Math.max(0, this.minute - 5)
      }
      this.checkTimeFormat('minute', data)
      this.updateTime()
    },
    checkTimeFormat (key, data) {
      if (data.toString().length < 2 && data !== 0) {
        this.time[key] = '0' + data.toString()
      } else {
        if (data.toString().length < 2) {
          this.time[key] = '00'
        } else {
          this.time[key] = data.toString()
        }
      }
    },
    validateMinute (el) {
      if (el.keyCode >= 48 && el.keyCode <= 57 && this.time.minute.toString().length + 1 <= 2) {
        if (parseInt(this.time.minute + String.fromCharCode(el.keyCode)) < 60) {
          this.updateTime()
          return true
        }
        el.preventDefault()
      } else {
        el.preventDefault()
      }
    },
    validateHour (el) {
      if (el.keyCode >= 48 && el.keyCode <= 57 && this.time.hour.toString().length + 1 <= 2) {
        if (parseInt(this.time.hour + String.fromCharCode(el.keyCode)) < 24) {
          this.updateTime()
          return true
        }
        el.preventDefault()
      } else {
        el.preventDefault()
      }
    },
    updateTime () {
      this.screening.show_time = this.screening.show_date + 'T' + this.time.hour + ':' + this.time.minute + ':00'
    }
  },
  computed: {
    hour () {
      return parseInt(this.time.hour)
    },
    minute () {
      return parseInt(this.time.minute)
    }
  }
}
</script>

<style lang="scss" scoped>
.timepicker {
  input {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 3em;
    border-radius: $main-round;
    border: 1px solid $main-blue;
  }
  .arrow-up {
    margin: 0 auto;
    border-radius: $main-round;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid $main-blue;
  }
  .arrow-down {
    margin: 0 auto;
    border-radius: $main-round;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid $main-blue;
  }
}
</style>
