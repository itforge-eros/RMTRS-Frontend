<template>
  <div id="screening">
    <div class="row">
      <div class="day-detail col-12" v-for="index in 10" :key="index">
          <h3 class="col-12">{{ date }}</h3>
          <div class="theater col-12">
            <div class="row">
              <div class="id col-2">
                <h1>{{ index }}</h1>
              </div>
              <div class="detail col-10">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod maxime et in est quaerat voluptas, fuga aliquam eius porro sapiente recusandae optio. Voluptas nesciunt voluptatem quod minima? Dolores, veritatis sed!</p>
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
      date: 'Monday, March 26, 2018'
    }
  }
}
</script>

<style lang="scss" scoped>
.day-detail {
  background-color: rgba($color: $main-white, $alpha: 0.18);
  margin: 20px 0 0;
  padding: 1em;
  border-radius: $main-round;
  box-shadow: $main-shadow;
  h3 {
    margin: 0;
    padding: 1em 1em;
    background-color: $main-blue;
    color: #ffffff;
    border-radius: $main-round;
  }
  .theater {
    margin-top: 10px;
    .id {
      text-align: center;
      background-color: $main-blue;
      border-radius: $main-round;
      color: $main-yellow;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
