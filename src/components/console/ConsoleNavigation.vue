<template>
  <div v-if="accountRights !== null">
    <div class="menu" v-for="(menu, index) in menus" :key="index">
        <router-link v-if="accountRights[menu.name].read" tag="span" active-class="active" :to="{name: menu.path}">{{menu.menu}}</router-link>
    </div>
    <div class="menu">
      <span @click="alert.logout = true">Logout</span>
    </div>
    <alert @yes="logout" @no="alert.logout = false" mode="confirm" header="Are you sure?" message="You're about to logout" :open="alert.logout"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Alert from '@/components/Alert'
export default {
  name: 'ConsoleNavigation',
  components: {Alert},
  data () {
    return {
      alert: {
        logout: false
      },
      accountRights: null,
      menus: [
        {
          name: 'reservation',
          menu: 'Reservation',
          path: 'Manage Reservation'
        },
        {
          name: 'movie',
          menu: 'Movie',
          path: 'Manage Movie Available'
        },
        {
          name: 'theatre',
          menu: 'Theatre',
          path: 'Manage Theatre'
        },
        {
          name: 'screening',
          menu: 'Screening',
          path: 'Manage Screening'
        },
        {
          name: 'account',
          menu: 'Account',
          path: 'Manage Account'
        },
        {
          name: 'seattype',
          menu: 'Seat Type',
          path: 'Manage Seat Type'
        }
      ]
    }
  },
  mounted () {
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase())
  },
  computed: {
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  },
  methods: {
    logout () {
      this.alert.logout = true
      this.clearAccount()
      this.$router.go({name: 'Login'})
    },
    ...mapActions([
      'clearAccount'
    ])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: block;
  cursor: pointer;
  &:hover {
    background-color: $main-blue;
  }
  span {
    color: #ffffff;
    text-align: center;
    display: block;
    padding: 1em;
  }
}
.active {
  background-color: $main-blue;
}
</style>
