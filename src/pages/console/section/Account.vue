<template>
  <div class="row">
    <div class="col-12">
      <vuetable ref="vuetable"
        api-url="http://rmtrs.itforge.io:8888/account/paged?page=0"
        :fields="columns"
        :css="tableMeta"
        pagination-path="">

        <template slot="name" slot-scope="props">
          <p>{{ props.rowData.title }} {{ props.rowData.fname }} {{ props.rowData.lname }}</p>
        </template>

        <template slot="action" slot-scope="props">
          <router-link tag="button" style="color: blue" class="btn m-1" :to="{name: 'AccountEditor', params: {id: props.rowData.id}}">Edit</router-link>
          <router-link tag="button" style="color: red" class="btn m-1" :to="'account/delete/'+props.rowData.id">Delete</router-link>
        </template>

      </vuetable>
    </div>
    <div class="add-btn">
      <span>+</span>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'Account',
  components: {Vuetable},
  data () {
    return {
      tableMeta: {
        tableClass: 'table table-striped'
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
          titleClass: 'text-center',
          dataClass: 'text-center center-row'
        }
      ]
    }
  }
}
</script>
