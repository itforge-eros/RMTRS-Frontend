<template>
  <div class="row">
    <div class="col-12">
      <vuetable ref="vuetable"
        :api-url="`${API_URL}/account/paged?page=0`"
        :fields="columns"
        :css="tableMeta"
        pagination-path="">

        <template slot="name" slot-scope="props">
          <p>{{ props.rowData.title }} {{ props.rowData.fname }} {{ props.rowData.lname }}</p>
        </template>

        <template slot="action" slot-scope="props">
          <div v-if="accountRights.write >= getRoleLevel(props.rowData.role.toLowerCase())">
            <router-link tag="button" style="color: blue" class="btn m-1" :to="{name: 'AccountEditor', params: {id: props.rowData.id}}">Edit</router-link>
            <button tag="button" style="color: red" class="btn m-1" @click="handleDelete(props.rowData.id)">Delete</button>
          </div>
          <div v-else>
            <p>No rights to manage this account</p>
          </div>
        </template>

      </vuetable>
    </div>
    <router-link tag="div" :to="{name: 'Add Account'}" class="add-btn">
      <span>+</span>
    </router-link>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import { mapGetters } from 'vuex'
import { API_URL } from '@/config/constants'
import axios from '@/config/axios.config'
export default {
  name: 'Account',
  components: {Vuetable},
  data () {
    return {
      API_URL,
      accountRights: null,
      tableMeta: {
        tableClass: 'table table-striped table-spread'
      },
      columns: [
        {
          name: '__slot:name',
          title: 'Full Name',
          titleClass: 'text-center',
          dataClass: 'center-row'
        },
        {
          name: 'role',
          title: 'Role',
          titleClass: 'text-center',
          dataClass: 'text-center center-row'
        },
        {
          name: '__slot:action',
          title: 'Action',
          titleClass: 'text-center table-action',
          dataClass: 'text-center center-row'
        }
      ]
    }
  },
  mounted () {
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).account
  },
  computed: {
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  },
  methods: {
    getRoleLevel (role) {
      if (role === 'staff') {
        return 0
      } else {
        if (role === 'manager') {
          return 1
        } else {
          return 2
        }
      }
    },
    handleDelete (id) {
      axios.delete(`/account/${id}`)
        .then(({data}) => {
          console.log(data)
          location.reload()
        })
        .catch(console.log)
    }
  }
}
</script>
