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
  name: 'Home',
  data () {
    return {
      msg: 'Home Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
