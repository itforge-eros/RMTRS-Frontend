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
import { mapActions } from 'vuex'
export default {
  name: 'ConsoleNavigation',
  data () {
    return {
      menus: [
        {menu: 'รายการจอง', role: 0, path: 'Manage Reservation'},
        {menu: 'ข้อมูลภาพยนตร์', role: 1, path: 'Manage Movie Available'},
        {menu: 'โรงฉายภาพยนตร์', role: 2, path: 'Manage Theatre'},
        {menu: 'รอบฉายภาพยนตร์', role: 3, path: 'Manage Screening'},
        {menu: 'จัดการบัญชี', role: 4, path: 'Manage Account'}
      ]
    }
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
