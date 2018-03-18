<template>
  <div class="container-fluid">
    <div class="container">
      <h3 class="text-center">
        {{msg}}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Showtime',
  data () {
    return {
      msg: 'Showtime Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
