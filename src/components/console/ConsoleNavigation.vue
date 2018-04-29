<template>
  <div v-if="accountRights !== null">
    <div class="menu" v-for="(menu, index) in menus" :key="index">
        <router-link v-if="accountRights[menu.name].read" tag="span" active-class="active" :to="{name: menu.path}">{{menu.menu}}</router-link>
    </div>
    <div class="menu">
      <span @click="logout">ออกจากระบบ</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ConsoleNavigation',
  data () {
    return {
      accountRights: null,
      menus: [
        {
          name: 'reservation',
          menu: 'รายการจอง',
          path: 'Manage Reservation'
        },
        {
          name: 'movie',
          menu: 'ข้อมูลภาพยนตร์',
          path: 'Manage Movie Available'
        },
        {
          name: 'theatre',
          menu: 'โรงฉายภาพยนตร์',
          path: 'Manage Theatre'
        },
        {
          name: 'screening',
          menu: 'รอบฉายภาพยนตร์',
          path: 'Manage Screening'
        },
        {
          name: 'account',
          menu: 'จัดการบัญชี',
          path: 'Manage Account'
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
