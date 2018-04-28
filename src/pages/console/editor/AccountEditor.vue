<template>
  <div id="editor">
    <div class="row">
      <div class="col-12 p-0">
        <h3 v-if="isNew" class="header py-2 px-4 mb-3">Add Account</h3>
        <h3 v-else class="header py-2 px-4 mb-3">{{ account.fname }}'s Account</h3>
      </div>
    </div>
    <form>
      <div class="row">
        <div :class="formMeta[key][1]" v-for="(meta, key, index) in formMeta" :key="index">
          <label :for="key">{{ meta[0] }}</label>
          <input :disabled="key === 'username' && !isNew" class="form-control" :id="key" v-model="account[key]"/>
        </div>
        <div class="form-group col-12 col-md-4">
          <label for="role">Role</label>
          <select class="form-control" id="role" v-model="account.role">
            <option disabled>Choose your role</option>
            <option :selected="account.role === role" v-for="(role, index) in roles" :key="index" :value="role">{{ role }}</option>
          </select>
        </div>
      </div>
      <div class="row mb-1 mt-5">
        <div class="col-12 p-2">
          <button v-if="isNew" class="float-right btn btn-block">Add</button>
          <button v-else class="float-right btn btn-block">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import accountEditorFacade from '@/facades/AccountEditorFacade'
export default {
  name: 'AccountEditor',
  data () {
    return {
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
  },
  methods: {
    fetchAccount () {
      accountEditorFacade.getAccount(this.$route.params.id)
        .then(({data}) => {
          this.account = data
        })
        .catch(console.log)
    }
  }
}
</script>
