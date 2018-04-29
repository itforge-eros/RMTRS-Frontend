<template>
  <div id="editor">
    <div class="row">
      <div class="col-12 p-0">
        <h3 v-if="isNew" class="header py-2 px-4 mb-3">Add Account</h3>
        <h3 v-else class="header py-2 px-4 mb-3">{{ account.fname }}'s Account</h3>
      </div>
    </div>
    <form v-if="accountRights !== null">
      <div class="row">
        <div :class="formMeta[key][1]" v-for="(meta, key, index) in formMeta" :key="index">
          <label :for="key">{{ meta[0] }}</label>
          <input :disabled="key === 'username' && !isNew" class="form-control" :id="key" v-model="account[key]"/>
        </div>
        <div class="form-group col-12 col-md-4">
          <label for="role">Role</label>
          <select class="form-control" id="role" v-model="account.role">
            <option disabled>Choose your role</option>
            <option :selected="account.role === role" v-for="(role, index) in roleControl" :key="index" :value="role">{{ role }}</option>
          </select>
        </div>
        <div v-if="isNew" class="col-12">
          <div class="row px-4 py-2 password">
            <div class="form-group col-12 col-sm-6">
              <label for="pass-1">Password</label>
              <input class="form-control" type="password" id="pass-1">
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="pass-2">Ensure you password again</label>
              <input class="form-control" type="password" id="pass-2">
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-1 mt-2">
        <div class="col-12 p-0">
          <button v-if="isNew" class="float-right btn btn-block">Add</button>
          <button v-else class="float-right btn btn-block">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import accountEditorFacade from '@/facades/AccountEditorFacade'
import { mapGetters } from 'vuex'
export default {
  name: 'AccountEditor',
  data () {
    return {
      accountRights: null,
      isNew: null,
      account: null,
      formMeta: {
        username: ['Username', 'form-group col-12 col-md-6'],
        phone: ['Phone Number', 'form-group col-12 col-md-6'],
        title: ['Title', 'form-group col-12 col-md-2'],
        fname: ['First Name', 'form-group col-12 col-md-5'],
        lname: ['Last Name', 'form-group col-12 col-md-5']
      },
      roles: ['STAFF', 'MANAGER', 'ADMIN']
    }
  },
  created () {
    this.account = {
      id: null,
      username: '',
      password: '',
      title: '',
      fname: '',
      lname: '',
      phone: '',
      role: '',
      active: true
    }
  },
  mounted () {
    if (this.$route.name === 'Add Account') {
      this.isNew = true
    } else {
      this.isNew = false
      this.fetchAccount()
    }
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).account
  },
  methods: {
    fetchAccount () {
      accountEditorFacade.getAccount(this.$route.params.id)
        .then(({data}) => {
          this.account = data
        })
        .catch(console.log)
    }
  },
  computed: {
    roleControl () {
      return this.roles.filter(x => this.roles.indexOf(x) <= this.accountRights.write )
    },
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  }
}
</script>

<style lang="scss" scoped>
.password {
  background: adjust-color($color: $main-gray, $lightness: 40%, $alpha: 1.0);
  border-radius: $main-round;
}
</style>
