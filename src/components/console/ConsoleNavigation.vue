<template>
  <div>
    <div class="menu" v-for="(menu, index) in menus" :key="index">
        <router-link tag="span" active-class="active" :to="{name: menu.path}">{{menu.menu}}</router-link>
    </div>
    <div class="menu">
      <span>ออกจากระบบ</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleNavigation',
  data () {
    return {
      menus: [
        {menu: 'จัดการการชำระเงิน', role: 0, path: 'Manage Payment'},
        {menu: 'ข้อมูลภาพยนตร์', role: 1, path: 'Manage Movie Available'},
        {menu: 'โรงฉายภาพยนตร์', role: 2, path: 'Manage Theater'},
        {menu: 'รอบฉายภาพยนตร์', role: 3, path: 'Manage Screening'}
      ]
    }
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
