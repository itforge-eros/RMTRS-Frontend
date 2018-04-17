<template>
<div id="login" class="container">
  <div class="row">
    <div id="header" class="col-12 col-md">
      <h1>Console Login</h1>
    </div>
    <div class="col-12 col-md">
      <div id="login-form">
        <form v-on:click.prevent="login" action="#" method="post">
          <div class="aform">
            <span class="title">Username</span><input v-model.trim="username" type="text">
          </div>
          <div class="aform">
            <span class="title">Password</span><input v-model.trim="password" type="password">
          </div>
          <input type="submit" value="Login">
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import facade from '@/facades/LoginFacade'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      facade.login(this.username, this.password)
        .then(() => {
          this.$router.push({ name: 'Dashboard' })
        })
        .catch(err => {
          // Notice user that wrong username or password in here
          console.log(err)
        })
    }
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
