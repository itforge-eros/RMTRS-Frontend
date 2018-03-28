<template>
  <div id="screening">
    <div class="row">
      <div class="day-detail col-12">
          <h3 class="col-12">{{ date }}</h3>
          <div class="theater">
            <div class="row a-theater" v-for="theater in theaters" :key="theater.no">
              <div class="id col-2">
                <h1>{{ theater.no }}</h1>
              </div>
              <div class="detail col-10">
                <div class="row">
                  <div class="col-6 col-sm-3 col-lg-2 time-wrap" v-for="(timeData, index) in theater.times" :key="index">
                    <p class="time">{{timeData}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreeningDetail',
  data () {
    return {
      date: 'Monday, March 26, 2018',
      theaters: [
        {no: 1, times: ['12:30', '15:00', '17:30']},
        {no: 2, times: ['12:00', '15:00', '17:30']},
        {no: 3, times: ['12:20', '15:00', '17:30']},
        {no: 4, times: ['12:20', '15:00', '17:30']},
        {no: 5, times: ['12:35', '15:00', '17:30']},
        {no: 6, times: ['12:10', '15:00', '17:30']}
      ]
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
