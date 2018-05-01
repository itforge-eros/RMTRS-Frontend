<template>
  <div class="alert-wall" v-if="open">
      <div class="bg"></div>
      <div class="alert-content mx-auto">
          <h3>{{ header }}</h3>
          <p>{{ message }}</p>
          <div v-if="mode === 'info'">
            <button @click="$emit('close')" class="btn">Close</button>
          </div>
          <div v-else-if="mode === 'confirm'">
            <button @click="$emit('yes')" class="btn btn-warning">Yes</button>
            <button @click="$emit('no')" class="btn btn-dark">No</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['header', 'message', 'open', 'mode']
}
</script>

<style lang="scss" scoped>
.alert-wall {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.733);
  }
  .alert-content {
    position: absolute;
    z-index: 7;
    border: 2px solid $main-blue;
    padding: 1.5em 3em;
    background-color: #fff;
    border-radius: $main-round;
  }
}
</style>
