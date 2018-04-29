<template>
  <nav id="navbar">
    <router-link to="/" class="brand">Skydog Cineplex</router-link>
    <span v-if="getAccount !== null">
      <small class="text-muted"> : {{ getAccount.role }}</small>
      <router-link id="console-link" tag="span" class="float-right" :to="getPath">Console</router-link>
    </span>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Navigation',
  mounted () {
    this.fetchAccount()
  },
  computed: {
    ...mapGetters([
      'getAccount'
    ]),
    getPath () {
      const role = this.getAccount.role
      if (role === 'STAFF') {
        return {name: 'Manage Reservation'}
      } else if (role === 'MANAGER') {
        return {name: 'Manage Movie Available'}
      } else {
        return {name: 'Manage Account'}
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchAccount'
    ])
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: $main-blue;
  padding: 15px 20px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 1.3em;
  z-index: 10;
  .brand {
    color: $main-yellow;
    text-decoration: none;
    font-weight: bold;
  }
  span {
    color: #ffffff;
  }
}
#console-link {
  cursor: pointer;
  border-left: 3px solid #fff;
  padding-left: 10px;
}
</style>
