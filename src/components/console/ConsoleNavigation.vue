<template>
  <div id="console-navigation">
    <div class="menu" v-for="(menu, index) in menus" :key="index">
        <span>{{menu.menu}}</span>
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
        {menu: 'จัดการการชำระเงิน', role: 0},
        {menu: 'ข้อมูลภาพยนตร์', role: 1},
        {menu: 'โรงฉายภาพยนตร์', role: 2},
        {menu: 'รอบฉายภาพยนตร์', role: 3}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#console-navigation {
  width: auto;
  min-height: 100vh;
}
.menu {
  display: block;
  padding: 1em;
  &:hover {
    background-color: $main-blue;
  }
  span {
    color: #ffffff;
    text-align: center;
    display: block;
  }
}
.active {
  background-color: $main-blue;
}
</style>
