<template>
  <div>
    <div class="menu" v-for="(menu, index) in menus" :key="index">
        <router-link tag="span" active-class="active" :to="{name: menu.path}">{{menu.menu}}</router-link>
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
      menus: [
        {
          menu: 'รายการจอง',
          rights: {
            // [read, write]
            staff: [true, true],
            manager: [false, false],
            admin: [false, false]
          },
          path: 'Manage Reservation'
        },
        {
          menu: 'ข้อมูลภาพยนตร์',
          rights: {
            // [read, write]
            staff: [true, false],
            manager: [true, true],
            admin: [false, false]
          },
          path: 'Manage Movie Available'
        },
        {
          menu: 'โรงฉายภาพยนตร์',
          rights: {
            // [read, write]
            staff: [true, true],
            manager: [false, false],
            admin: [false, false]
          },
          path: 'Manage Theatre'
        },
        {
          menu: 'รอบฉายภาพยนตร์',
          rights: {
            // [read, write]
            staff: [true, false],
            manager: [true, true],
            admin: [false, false]
          },
          path: 'Manage Screening'
        },
        {
          menu: 'จัดการบัญชี',
          rights: {
            // [read, write]
            staff: [false, false],
            manager: [true, true],
            admin: [true, true]
          },
          path: 'Manage Account'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getAccount'
    ])
  },
  methods: {
    logout () {
      this.clearAccount()
      this.$router.replace('login')
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
