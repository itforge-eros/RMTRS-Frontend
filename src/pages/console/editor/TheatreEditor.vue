<template>
<div id='editor' v-if='accountRights !== null'>
  <div class='row'>
    <div class='col p-0'>
      <div v-if="isNew">
        <h3 class='header py-2 px-4 mb-3 col-12'>Add Theatre <span class='float-right'>{{ theatre }}</span>
        </h3>
        <div class="col-12">
          <div class="form-inline col-12 mb-2">
            <label for="theatre-name">Theatre Name : </label>
            <input class="form-control ml-2" id="theatre-name" type="text" v-model="theatre" placeholder="Enter this theatre name">
          </div>
        </div>
        <hr>
      </div>
      <h3 v-else-if="accountRights.write" class='header py-2 px-4'>Manage Theatre <span class='float-right'>{{ theatre }}</span></h3>
      <h3 v-else class='header py-2 px-4'>Viewing Theatre <span class='float-right'>{{ theatre }}</span></h3>
    </div>
  </div>
  <div id='chair-place mt-3'>
    <div class='row my-2 justify-content-center mb-3 chair-row' v-for='(row, index) in rows' :key='index'>
      <chair v-for='column in 10' :key='column' :seat='seats[row+column]' :mode="isNew"/>
    </div>
  </div>
  <div v-if="isNew" class="row">
    <div class="col p-0">
      <button @click="addNewTheatre" class="float-right btn btn-block mb-3">Add</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/config/axios.config'
import facade from '@/facades/TheatreEditorFacade'
import Chair from '@/components/console/Chair'
import { mapGetters } from 'vuex'
export default {
  name: 'TheatreEditor',
  components: {Chair},
  data () {
    return {
      isNew: null,
      rows: null,
      theatre: null,
      seats: null,
      accountRights: null
    }
  },
  created () {
    this.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    this.seats = {'B7': {'id': 126, 'row': 'B', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J4': {'id': 203, 'row': 'J', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G4': {'id': 173, 'row': 'G', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D4': {'id': 143, 'row': 'D', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J8': {'id': 207, 'row': 'J', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G8': {'id': 177, 'row': 'G', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I1': {'id': 190, 'row': 'I', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A4': {'id': 113, 'row': 'A', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D8': {'id': 147, 'row': 'D', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F1': {'id': 160, 'row': 'F', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I5': {'id': 194, 'row': 'I', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A8': {'id': 117, 'row': 'A', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C1': {'id': 130, 'row': 'C', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F5': {'id': 164, 'row': 'F', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I9': {'id': 198, 'row': 'I', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C5': {'id': 134, 'row': 'C', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F9': {'id': 168, 'row': 'F', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H2': {'id': 181, 'row': 'H', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C9': {'id': 138, 'row': 'C', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H6': {'id': 185, 'row': 'H', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E2': {'id': 151, 'row': 'E', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B2': {'id': 121, 'row': 'B', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H10': {'id': 189, 'row': 'H', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E6': {'id': 155, 'row': 'E', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B6': {'id': 125, 'row': 'B', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J3': {'id': 202, 'row': 'J', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E10': {'id': 159, 'row': 'E', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B10': {'id': 129, 'row': 'B', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J7': {'id': 206, 'row': 'J', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G3': {'id': 172, 'row': 'G', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D3': {'id': 142, 'row': 'D', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G7': {'id': 176, 'row': 'G', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A3': {'id': 112, 'row': 'A', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D7': {'id': 146, 'row': 'D', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A7': {'id': 116, 'row': 'A', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I4': {'id': 193, 'row': 'I', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F4': {'id': 163, 'row': 'F', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I8': {'id': 197, 'row': 'I', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C4': {'id': 133, 'row': 'C', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F8': {'id': 167, 'row': 'F', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C8': {'id': 137, 'row': 'C', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H1': {'id': 180, 'row': 'H', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E1': {'id': 150, 'row': 'E', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B1': {'id': 120, 'row': 'B', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H5': {'id': 184, 'row': 'H', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E5': {'id': 154, 'row': 'E', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B5': {'id': 124, 'row': 'B', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H9': {'id': 188, 'row': 'H', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E9': {'id': 158, 'row': 'E', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J2': {'id': 201, 'row': 'J', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G2': {'id': 171, 'row': 'G', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B9': {'id': 128, 'row': 'B', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D2': {'id': 141, 'row': 'D', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J6': {'id': 205, 'row': 'J', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G6': {'id': 175, 'row': 'G', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A2': {'id': 111, 'row': 'A', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D6': {'id': 145, 'row': 'D', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J10': {'id': 209, 'row': 'J', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G10': {'id': 179, 'row': 'G', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I3': {'id': 192, 'row': 'I', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A6': {'id': 115, 'row': 'A', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D10': {'id': 149, 'row': 'D', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F3': {'id': 162, 'row': 'F', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I7': {'id': 196, 'row': 'I', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A10': {'id': 119, 'row': 'A', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C3': {'id': 132, 'row': 'C', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F7': {'id': 166, 'row': 'F', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C7': {'id': 136, 'row': 'C', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H4': {'id': 183, 'row': 'H', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H8': {'id': 187, 'row': 'H', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E4': {'id': 153, 'row': 'E', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B4': {'id': 123, 'row': 'B', 'number': 4, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J1': {'id': 200, 'row': 'J', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E8': {'id': 157, 'row': 'E', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B8': {'id': 127, 'row': 'B', 'number': 8, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J5': {'id': 204, 'row': 'J', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G1': {'id': 170, 'row': 'G', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D1': {'id': 140, 'row': 'D', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'J9': {'id': 208, 'row': 'J', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G5': {'id': 174, 'row': 'G', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A1': {'id': 110, 'row': 'A', 'number': 1, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D5': {'id': 144, 'row': 'D', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'G9': {'id': 178, 'row': 'G', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A5': {'id': 114, 'row': 'A', 'number': 5, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I2': {'id': 191, 'row': 'I', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'D9': {'id': 148, 'row': 'D', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'A9': {'id': 118, 'row': 'A', 'number': 9, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F2': {'id': 161, 'row': 'F', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I6': {'id': 195, 'row': 'I', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C2': {'id': 131, 'row': 'C', 'number': 2, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F6': {'id': 165, 'row': 'F', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C6': {'id': 135, 'row': 'C', 'number': 6, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'I10': {'id': 199, 'row': 'I', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'F10': {'id': 169, 'row': 'F', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'C10': {'id': 139, 'row': 'C', 'number': 10, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H3': {'id': 182, 'row': 'H', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E3': {'id': 152, 'row': 'E', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'B3': {'id': 122, 'row': 'B', 'number': 3, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'H7': {'id': 186, 'row': 'H', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}, 'E7': {'id': 156, 'row': 'E', 'number': 7, 'active': true, 'seat_type': {'id': 2, 'name': 'Comfort', 'price': 150, 'description': 'Very Comfortable', 'active': true}, 'mode': 0}}
    this.theatre = ''
  },
  mounted () {
    if (this.$route.name === 'Add Theatre') {
      this.isNew = true
    } else {
      this.isNew = false
      this.fetchTheatre(this.$route.params.id)
    }
    this.accountRights = this.getRights(this.getAccount.role.toLowerCase()).theatre
  },
  computed: {
    ...mapGetters([
      'getAccount',
      'getRights'
    ])
  },
  methods: {
    fetchTheatre (id) {
      console.log(id)
      facade.getTheatreAndSeats(id)
        .then(({rows, theatre, seats}) => {
          this.rows = rows
          this.theatre = theatre
          this.seats = seats
        })
    },
    addNewTheatre () {
      const payload = {
        name: this.theatre,
        seats: Object.values(this.seats).map(seat => {
          seat.seat_type_id = seat.seat_type.id
          return seat
        })
      }
      console.log(payload)
      axios.post(`/theatre`, payload)
        .then(({data}) => {
          console.log(data)
          this.$router.push({ name: 'Manage Theatre' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  label, input {
    font-size: 0.8rem;
  }
}
#chair-place {
  overflow-x: auto;
}
.chair-row {
  width: 600px;
  margin: 0 auto;
}
</style>
