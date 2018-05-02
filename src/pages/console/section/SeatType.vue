<template>
  <div id="editor" v-if="accountRights !== null">
    <div class="row a-seat my-2 p-2" v-for="data in seatType" :key="data.id">
        <div class="col-12 col-md-9 px-3 seat-type">
          <div class="row">
            <div class="col-3 text-center seat-type">
              <img class="chair" src="../../../assets/chair.png" alt="">
            </div>
            <div v-if="editing.id !== data.id" class="col seat-type text-center">
              <h3>{{ data.name }}</h3>
              <small>{{ data.price }}</small>
            </div>
            <div v-else class="col seat-type text-center">
              <input class="form-control" type="text" v-model="data.name">
              <input class="form-control" type="text" v-model="data.price">
              <input class="form-control" type="text" v-model="data.description">
            </div>
          </div>
        </div>
        <div v-if="accountRights.write" class="col-12 col-md-3 pt-2 mb-3">
          <label>Action</label>
          <div class="row">
            <div v-if="editing.id !== data.id" class="col">
              <button @click="editMode(data, true)" class="btn" style="color: blue">Edit</button>
              <button @click="deleteSeat(data.id)" class="btn" style="color: red">Delete</button>
            </div>
            <div v-else class="col">
              <button class="btn" style="color: green">Save</button>
              <button @click="editMode(data, false)" class="btn" style="color: blue">Cancel</button>
            </div>
          </div>
        </div>
    </div>
    <div v-if="!adding.state" class="row">
      <div class="col-12 p-0">
        <button v-if="accountRights.write" @click="addingProduction(true)" class="btn">Add a Seat Type</button>
      </div>
    </div>
    <div v-else class="row adding">
      <div class="col-12 col-md-9 pt-2">
        <div class="row">
          <div class="form-group col-6">
            <label for="add">Name (Type)</label>
            <input type="text" class="form-control" id="add" v-model="adding.name">
          </div>
          <div class="form-group col-6">
            <label for="price">Price</label>
            <input type="text" class="form-control" id="price" v-model="adding.price">
          </div>
          <div class="form-group col-12">
            <label for="desc" class="mt-2 mb-0">Description</label>
            <textarea class="form-control mt-1" id="desc" cols="30" rows="10" v-model="adding.description"></textarea>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 pt-2">
        <label>Action</label>
        <div class="row">
          <div class="col">
            <button class="btn" style="color: green">Add</button>
            <button @click="addingProduction(false)" class="btn" style="color: red">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import seatTypeFacade from '@/facades/SeatTypeFacade'
import { mapGetters } from 'vuex'
export default {
  name: 'SeatType',
  data () {
    return {
      accountRights: null,
      seatType: null,
      editing: {id: null},
      adding: {
        id: null,
        name: null,
        price: null,
        description: null,
        state: false
      }
    }
  },
  mounted () {
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).seattype
    this.fetchSeatType()
  },
  methods: {
    fetchSeatType () {
      seatTypeFacade.getSeatType()
        .then(({data}) => {
          this.seatType = data
        })
    },
    addingProduction (mode) {
      this.adding.state = mode
    },
    editMode (data, mode) {
      if (mode) this.editing.id = data.id
      else this.editing.id = null
    },
    deleteSeat (id) {
      console.log(id)
    }
  },
  computed: {
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  }
}
</script>

<style lang="scss" scoped>
.a-seat {
  background: adjust-color($color: $main-gray, $lightness: 45%, $alpha: 1.0);
  border-radius: $main-round;
}

.seat-type {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.adding {
  background: adjust-color($color: $main-gray, $lightness: 50%, $alpha: 1.0);
  border-radius: $main-round;
}

.chair {
  width: 50px;
}
</style>
