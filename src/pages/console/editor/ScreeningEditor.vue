<template>
  <div id="editor" v-if="accountRights !== null">
    <div class="row">
      <div class="col-12 p-0">
        <h3 v-if="isNew && accountRights.write" class="header py-2 px-4 mb-3">Add Screening</h3>
        <h3 v-else-if="!accountRights.write" class="header py-2 px-4 mb-3">Viewing Screening {{ screening.id }}</h3>
        <h3 v-else class="header py-2 px-4 mb-3">Edit Screening {{ screening.id }}</h3>
      </div>
    </div>
    <form>
      <div :class="['row']" style="position: relative">
        <div class="prevent" v-if="!accountRights.write">
          <div class="pack">
            <h2>{{ readableTime }}</h2>
            <h3>{{ readableDate }}</h3>
          </div>
        </div>
        <div :class="[formMeta[key][1], {'blur': !accountRights.write}]" v-if="!exclude.includes(key) && ['date','time'].includes(formMeta[key][2])" v-for="(data, key) in screening" :key="data.id">
          <label :for="key">{{ formMeta[key][0] }} {{ screening[key] }}</label>
          <datepicker v-if="formMeta[key][2] === 'date'" @input="setDateData" :inline="true" wrapper-class="box-datepicker" calendar-class="design mx-auto" input-class="form-control read-only-except" :id="key"
            :value="screening[key]" />
          <div class="timepicker mt-3 row" v-else>
            <div class="col-6">
              <div @click="hourHandler(true)" class="arrow-up mb-3"></div>
              <input disabled @keypress="validateHour" v-model="hour" type="text">
              <div @click="hourHandler(false)" class="arrow-down mt-3"></div>
            </div>
            <div class="col-6">
              <div @click="minuteHandler(true)" class="arrow-up mb-3"></div>
              <input disabled @keypress="validateMinute" v-model="minute" type="text">
              <div @click="minuteHandler(false)" class="arrow-down mt-3"></div>
            </div>
            <div class="form-group col-12 mt-3">
              <label for="theatre">Theatre</label>
              <select class="form-control" id="theatre" v-model="screening.theatre">
                <option disabled>...</option>
                <option :selected="data.id === screening.theatre.id" :value="data" v-for="data in theatre" :key="data.id">{{ data.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 p-0">
          <h4 class="header py-2 px-4 mb-3">Movie Detail</h4>
        </div>
        <div v-if="accountRights.write" class="form-group col-12 mt-3">
          <label for="movie">Movie</label>
          <select class="form-control" id="movie" v-model="screening.movie">
            <option disabled>...</option>
            <option :selected="data.id === screening.movie.id" :value="data" v-for="data in movie" :key="data.id">{{ data.en_title }}</option>
          </select>
        </div>
        <div v-for="(meta, key) in formMeta" :key="key" v-if="meta[2] === 'read-only'" :class="meta[1]">
          <label :for="key">{{ meta[0] }}</label>
          <input disabled class="form-control" :id="key" v-model="screening.movie[key]"/>
        </div>
      </div>
      <div v-if="accountRights.write" class="row mb-1 mt-5">
        <div class="col-12 p-0">
          <button @click="handleAdd" v-if="isNew" class="float-right btn btn-block">Add</button>
          <button @click="handleSubmitChange" v-else class="float-right btn btn-block">Save</button>
        </div>
      </div>
    </form>
    <alert :mode="alert.mode" :header="alert.header" :message="alert.message" :open="alert.open" @close="alert.open = false"/>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
import screeningEditorFacade from '@/facades/ScreeningEditorFacade'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import axios from '@/config/axios.config'
import { mapGetters } from 'vuex'
export default {
  name: 'ScreeningEditor',
  components: {Datepicker, Alert},
  data () {
    return {
      alert: {
        header: '',
        message: '',
        open: false,
        mode: ''
      },
      accountRights: null,
      isNew: null,
      movie: null,
      selectedDatepicker: null,
      formMeta: {
        show_date: ['วันที่ฉาย', 'form-group col-12 col-md-6', 'date'],
        show_time: ['เวลาที่ฉาย', 'form-group col-12 col-md-6', 'time'],
        th_title: ['ชื่อไทย', 'form-group col-12 col-sm-6', 'read-only'],
        en_title: ['English Title', 'form-group col-12 col-sm-6', 'read-only'],
        release_date: ['Release Date', 'form-group col-12 col-md-3', 'read-only'],
        end_date: ['End Date', 'form-group col-12 col-md-3', 'read-only'],
        duration: ['Duration', 'form-group col-6 col-sm-3', 'read-only'],
        rate: ['Rate', 'form-group col-3', 'read-only']
      },
      exclude: ['active', 'movie', 'theatre', 'id'],
      screening: null,
      time: {
        hour: '00',
        minute: '00'
      },
      theatre: {}
    }
  },
  created () {
    this.screening = {
      id: null,
      show_date: '',
      show_time: '',
      active: true,
      theatre: {
        id: null,
        name: ''
      },
      movie: {
        id: null,
        th_title: '',
        en_title: '',
        synopsis: '',
        duration: 0,
        poster_url: '',
        trailer_url: '',
        release_date: '',
        end_date: '',
        rate: '',
        active: true
      }
    }
  },
  mounted () {
    if (this.$route.name === 'Add Screening') {
      this.isNew = true
    } else {
      this.isNew = false
      this.fetchScreening()
    }
    this.fetchTheatre()
    this.fetchMovie()
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).screening
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
    fetchTheatre () {
      screeningEditorFacade.getTheareWithoutSeats()
        .then(({data}) => {
          this.theatre = data
        })
        .catch(console.log)
    },
    fetchMovie () {
      screeningEditorFacade.getMovie()
        .then(({data}) => {
          this.movie = data.data
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
    },
    handleAdd () {
      const payload = {
        theatre_id: this.screening.theatre.id,
        movie_id: this.screening.movie.id,
        show_date: this.screening.show_date,
        show_time: this.screening.show_time
      }
      axios.post('/screening', payload)
        .then(({data}) => {
          console.log(data)
          this.alertBox('Done', 'The change has been saved', 'info')
          this.fetchScreening()
        })
        .catch(err => {
          this.alertBox('Conflict', 'The option you have selected is conflict to existing screening. Please choose other option.', 'info')
          console.log(err.response.data) // Conflict Screening Object
        })
    },
    handleSubmitChange () {
      const payload = {
        theatre_id: this.screening.theatre.id,
        movie_id: this.screening.movie.id,
        show_date: this.screening.show_date,
        show_time: this.screening.show_time
      }
      axios.put(`/screening/${this.screening.id}`, payload)
        .then(({data}) => {
          console.log(data)
          this.alertBox('Done', 'The change has been saved', 'info')
          this.fetchScreening()
        })
        .catch(err => {
          this.alertBox('Conflict', 'The option you have selected is conflict to existing screening. Please choose other option.', 'info')
          console.log(err.response.data) // Conflict Screening Object
        })
    },
    alertBox (header, msg, mode) {
      this.alert.header = header
      this.alert.message = msg
      this.alert.mode = mode
      this.alert.open = true
    }
  },
  computed: {
    hour () {
      return parseInt(this.time.hour)
    },
    minute () {
      return parseInt(this.time.minute)
    },
    ...mapGetters([
      'getAccount',
      'getRights'
    ]),
    readableDate () {
      return moment(this.screening.show_date).format('dddd, MMMM Do YYYY')
    },
    readableTime () {
      return moment(this.screening.show_time).format('HH:mm')
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
.prevent {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffffc9;
}
.pack {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  padding: 10px 25px;
  border-radius: $main-round;
}
.blur {
  filter: blur(4px);
}
</style>
