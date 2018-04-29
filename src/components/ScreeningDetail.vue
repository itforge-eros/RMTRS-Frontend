<template>
  <div id="screening">
    <div id="time-wrapper" v-if="timeSelector">
      <div class="bg"></div>
      <datepicker @selected="setDate" :value="date" wrapper-class="box-datepicker" calendar-class="design mx-auto text-c-black" input-class="form-control read-only-except" :inline="true"></datepicker>
      <button @click="timeSelector = false" class="btn mx-auto mt-2">Close</button>
    </div>
    <div class="row">
      <div class="day-detail col-12">
          <h3 class="col-12">{{ formatDate(datetime) }}
            <span @click="timeSelector = true" class="time-trigger float-right">
              <p>Change date</p>
            </span>
          </h3>
          <div class="theater">
            <div class="row a-theater" v-for="({theatre, screenings}) in data" :key="theatre.id">
              <div class="id col-2">
                <h1>{{ theatre.name }}</h1>
              </div>
              <div class="detail col-10">
                <div class="row">
                  <router-link :to="'/movie/'+movieId+'/screening/'+screening.id" class="col-6 col-sm-3 col-lg-2 time-wrap" v-for="screening in screenings" :key="screening.id">
                    <p class="time">{{formatTime(screening.show_time)}}</p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import facade from '@/facades/ScreeningDetailFacade'
export default {
  name: 'ScreeningDetail',
  components: {Datepicker},
  data () {
    return {
      timeSelector: false,
      movieId: this.$route.params.id,
      datetime: this.$route.query.date ? moment(this.$route.query.date) : moment(),
      data: []
    }
  },
  mounted () {
    this.fetchScreenings()
  },
  methods: {
    setDate (date) {
      this.datetime = moment(date)
    },
    // str of datetime
    formatTime (datetime) {
      return moment(datetime).format('HH:mm')
    },
    // moment instances
    formatDate (datetime) {
      return moment(datetime).format('dddd, MMMM Do YYYY')
    },
    fetchScreenings () {
      facade
        .getAvailableScreenings(this.datetime.format('YYYY-MM-DD'), this.movieId)
        .then(({data}) => { this.data = data }) // data is list of theatres with screenings
    }
  },
  computed: {
    date () {
      return this.datetime.format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.day-detail {
  background-color: rgba($color: $main-white, $alpha: 0.18);
  margin: 20px 0 40px;
  padding: 1em;
  border-radius: $main-round;
  box-shadow: $main-shadow;
  h3 {
    font-size: 16px;
    margin: 0;
    padding: 1em;
    background-color: $main-blue;
    color: #ffffff;
    border-radius: $main-round;
  }
  .theater {
    .a-theater {
      background-color: $main-white;
      padding: 0.5em;
      border-radius: $main-round;
    }
    .row {
      margin: 10px 0;
    }
    .id {
      text-align: center;
      background-color: $main-blue;
      border-radius: $main-round;
      color: $main-yellow;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .detail {
      .time {
        text-align: center;
        background-color: $main-blue;
        border-radius: $main-round;
        padding: 0.5em 1em;
        color: $main-yellow;
        font-weight: bold;
      }
    }
  }
}
#time-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.678);
  }
  button {
    position: relative;
    width: 100px;
    color: #fff;
    background: $main-blue;
  }
}
.blur {
  filter: blur(4px);
}
.time-trigger {
  background-color: #ffffff;
  color: #000;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0 0.25rem 0.25rem 0;
  border-right: 5px solid $main-blue;
  border-top: 5px solid $main-blue;
  border-bottom: 5px solid $main-blue;
  p {
    margin: 0;
    font-weight: bolder;
  }
}
</style>
