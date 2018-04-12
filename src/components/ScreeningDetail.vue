<template>
  <div id="screening">
    <div class="row">
      <div class="day-detail col-12">
          <h3 class="col-12">{{ formatDate(datetime) }}</h3>
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
import facade from '@/facades/ScreeningDetailFacade'
export default {
  name: 'ScreeningDetail',
  data () {
    return {
      movieId: this.$route.params.id,
      datetime: this.$route.query.date ? moment(this.$route.query.date) : moment(),
      data: []
    }
  },
  mounted () {
    this.fetchScreenings()
  },
  methods: {
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
</style>
