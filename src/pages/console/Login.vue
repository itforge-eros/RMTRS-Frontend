<template>
<div id="login" class="container">
  <alert mode="info" @close="loginFailed = false" header="Login Failed!" message="Make sure about your username and password. Then try again" :open="loginFailed" />
  <div class="row">
    <div id="header" class="col-12 col-md">
      <h1>Console Login</h1>
    </div>
    <div class="col-12 col-md">
      <div id="login-form">
        <form>
          <div class="aform">
            <span class="title">Username</span><input v-model.trim="username" type="text">
          </div>
          <div class="aform">
            <span class="title">Password</span><input v-model.trim="password" type="password">
          </div>
          <input type="submit" @click="login" value="Login">
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import facade from '@/facades/LoginFacade'
import Alert from '@/components/Alert'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {Alert},
  data () {
    return {
      username: '',
      password: '',
      loginFailed: false
    }
  },
  methods: {
    login () {
      facade.login(this.username, this.password)
        .then(() => {
          this.fetchAccount()
          const user = JSON.parse(localStorage.currentAccount)
          console.log(user)
          if (user.role === 'STAFF') {
            this.$router.push({ name: 'Manage Reservation' })
          } else if (user.role === 'MANAGER') {
            this.$router.push({ name: 'Manage Movie Available' })
          } else {
            this.$router.push({ name: 'Manage Account' })
          }
        })
        .catch(err => {
          // Notice user that wrong username or password in here
          console.log(err)
          this.loginFailed = true
        })
    },
    ...mapActions([
      'fetchAccount'
    ])
  }
}
</script>

<style lang="scss" scoped>
.aform {
  margin: 1em 10px;
  .title {
    font-weight: bold;
    width: 100%;
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
  input {
    margin: 0 auto;
    display: block;
    border: none;
    border-bottom: 1px solid #000000;
    text-align: center;
    transition: 0.25s ease;
    padding: 10px;
    &:focus {
      outline-width: 0;
      transform: scale(1.1);
    }
  }
}
#header {
  h1 {
    text-align: center;
    &::first-letter {
      color: $main-yellow;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
#login {
  padding: 1em;
  margin-top: 20px;
  display: block;
  input[type=submit] {
    padding: 1em;
    background-color: #ffffff;
    border-radius: $main-round;
    border: 1px solid #000000;
    text-align: center;
    margin: 20px auto;
    display: block;
  }
}
</style>
