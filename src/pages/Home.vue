<template>
  <div class="container-fluid">
    <div class="container">
      <h3 class="text-center">
        {{msg}}
      </h3>
      <div class="row">
        <carousel :perPage=1>
          <slide>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rem suscipit eum iure. Facere numquam, fugiat aspernatur quibusdam
            ea autem magnam quis architecto rem impedit fuga enim vel sed maxime?
          </slide>
          <slide>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus illo aliquam vero assumenda unde aut laudantium non! Dolor,
            voluptatum ipsam, deleniti magni, quaerat quasi placeat nemo pariatur ab aspernatur tempore.
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page'
    }
  },
  components: {Carousel, Slide}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
