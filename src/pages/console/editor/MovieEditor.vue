<template>
  <div id="editor">
    <div class="row">
      <div class="col-12 p-0">
        <h3 class="header py-2 px-4">แก้ไขข้อมูลภาพยนตร์</h3>
      </div>
    </div>
    <form v-if="movie !== null">
      <div class="row">
        <div v-if="!exclude.includes(key)" :class="formMeta[key][1]" v-for="(meta, key) in formMeta" :key="key">
          <label :for="key">{{ formMeta[key][0] }}</label>
          <input v-model="movie[key]" v-if="formMeta[key][2] === 'text'" type="text" class="form-control" :id="key">
          <datepicker @opened="setSelectedDatepicker(key)" @selected="setDateData" wrapper-class="box-datepicker" calendar-class="design" input-class="form-control read-only-except" v-else-if="formMeta[key][2] === 'date'" :value="movie[key]"></datepicker>
        </div>
        <div class="form-group col-12 col-md-6" v-for="(production, key) in movie.productions" :key="production.id">
          <label :for="'production-'+key">{{ formMeta.productions.name }}</label>
          <input type="text" class="form-control" :id="'production-'+key" :value="production.name">
        </div>
        <div class="form-group col-12">
          <label for="synopsis">Synopsis</label>
          <textarea type="text" class="form-control" id="synopsis" rows="5" :value="movie.synopsis"></textarea>
        </div>
      </div>
      <hr>
      <section id="actor">
        <div class="row">
          <div class="col-12 p-0">
            <h4 class="header py-2 px-4">นักแสดง</h4>
          </div>
        </div>
        <div class="row actor my-2" v-for="(actor, key, index) in movie.actors" :key="index">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.actors" :key="inKey">
            <label :for="'actor-'+actor.id">{{ formMeta.actors[inKey] }}</label>
            <input disabled type="text" class="form-control" :id="'actor-'+actor.id" :value="actor[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div class="col">
                <button class="btn" style="color: blue">Edit</button>
                <button class="btn" style="color: red">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row actor my-2 add" v-if="adding.actor.state">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.actors" :key="inKey">
            <label :for="'add-actor-'+inKey">{{ formMeta.actors[inKey] }}</label>
            <input type="text" class="form-control" :id="'add-actor-'+inKey" v-model="adding.actor[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div class="col">
                <button class="btn" style="color: green" @click="persistActor">เพิ่ม</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 p-0">
            <button @click="addingActor" v-show="!adding.actor.state" class="btn">เพิ่มนักแสดง</button>
          </div>
        </div>
      </section>
      <hr>
      <section id="director">
        <div class="row">
          <div class="col-12 p-0">
            <h4 class="header py-2 px-4">ผู้กำกับ</h4>
          </div>
        </div>
        <div class="row director my-2" v-for="(director, key, index) in movie.directors" :key="index">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.directors" :key="inKey">
            <label :for="director.id+director.fname">{{ formMeta.directors[inKey] }}</label>
            <input disabled type="text" class="form-control" :id="director.id+director.fname" :value="director[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div class="col">
                <button class="btn" style="color: blue">Edit</button>
                <button class="btn" style="color: red">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row director my-2 add" v-if="adding.director.state">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.directors" :key="inKey">
            <label :for="'add-director-'+inKey">{{ formMeta.directors[inKey] }}</label>
            <input type="text" class="form-control" :id="'add-director-'+inKey" v-model="adding.director[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div class="col">
                <button class="btn" style="color: green" @click="persistDirector">เพิ่ม</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 p-0">
            <button @click="addingDirector" v-show="!adding.director.state" class="btn">เพิ่มผู้กำกับ</button>
          </div>
        </div>
      </section>
      <hr>
      <section id="genre">
        <div class="row">
          <div class="col-12 p-0">
            <h4 class="header py-2 px-4">ประเภท</h4>
          </div>
        </div>
        <div class="row">
          <div :class="['p-2', 'col-6', 'col-md-2']" v-for="item in genre" :key="item.id">
            <div class="btn form-check p-0">
              <input class="form-check-input" :checked="genreAssigned.includes(item.id)" @change="handleSelectGenre(item)" type="checkbox" value="" :id="item.name">
              <label class="p-2" :for="item.name">
                {{ item.name }}
              </label>
            </div>
          </div>
        </div>
      </section>
      <div class="row mb-1 mt-5">
        <div class="col-12 p-2">
          <button class="float-right btn btn-block" @click="handleSubmitChange">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import screeningFacade from '@/facades/ScreeningFacade'
import genreFacade from '@/facades/GenreFacade'
import axios from '@/config/axios.config'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
export default {
  name: 'MovieEditor',
  components: {Datepicker},
  data () {
    return {
      selectedDatepicker: null,
      movie: null,
      genre: null,
      adding: {
        actor: {
          state: false,
          fname: '',
          mname: '',
          lname: ''
        },
        director: {
          state: false,
          fname: '',
          mname: '',
          lname: ''
        }
      },
      exclude: ['actors', 'directors', 'productions'],
      formMeta: {
        th_title: ['ชื่อไทย', 'form-group col-12 col-sm-6', 'text'],
        en_title: ['English Title', 'form-group col-12 col-sm-6', 'text'],
        release_date: ['Release Date', 'form-group col-12 col-md-3', 'date'],
        end_date: ['End Date', 'form-group col-12 col-md-3', 'date'],
        duration: ['Duration', 'form-group col-6 col-sm-3', 'text'],
        poster_url: ['Poster URL', 'form-group col-12 col-sm-6', 'text'],
        trailer_url: ['Trailer URL', 'form-group col-12 col-sm-6', 'text'],
        rate: ['Rate', 'form-group col-3', 'text'],
        actors: {
          fname: 'First Name',
          mname: 'Middle Name',
          lname: 'Last Name'
        },
        directors: {
          fname: 'First Name',
          mname: 'Middle Name',
          lname: 'Last Name'
        },
        productions: {
          name: 'Name'
        }
      }
    }
  },
  mounted () {
    this.fetchMovie()
    this.fetchGenre()
  },
  methods: {
    fetchMovie () {
      screeningFacade.getMovie(this.$route.params.id)
        .then(({data}) => {
          this.movie = data
        })
        .catch(console.log)
    },
    fetchGenre () {
      genreFacade.getGenre()
        .then(({data}) => {
          this.genre = data
        })
        .catch(console.log)
    },
    setDateData (date) {
      this.movie[this.selectedDatepicker] = moment(date).format('YYYY-MM-DD')
    },
    setSelectedDatepicker (key) {
      this.selectedDatepicker = key
    },
    addingDirector () {
      this.adding.director.state = true
    },
    addingActor () {
      this.adding.actor.state = true
    },
    handleSubmitChange () {
      const payload = Object.assign({}, this.movie)
      payload.actors = payload.actors.map(actor => actor.id)
      payload.directors = payload.directors.map(director => director.id)
      payload.genres = payload.genres.map(genre => genre.id)
      payload.productions = payload.productions.map(prod => prod.id)
      console.log(payload)
      axios.put(`/movie/${payload.id}`, payload)
        .then(({data}) => {
          console.log(data)
          location.reload()
        })
        .catch(console.log)
    },
    persistActor () {
      axios.post('/actor', this.adding.actor)
        .then(({data}) => {
          this.movie.actors.push(data)
          this.adding.actor = {
            state: false,
            fname: '',
            mname: '',
            lname: ''
          }
        })
        .catch(console.log)
    },
    persistDirector () {
      axios.post('/director', this.adding.director)
        .then(({data}) => {
          this.movie.directors.push(data)
          this.adding.director = {
            state: false,
            fname: '',
            mname: '',
            lname: ''
          }
        })
        .catch(console.log)
    },
    handleSelectGenre (genre) {
      console.log(genre)
      if (this.movie.genres.includes(genre)) {
        const idx = this.movie.genres.indexOf(genre)
        this.movie.genres.splice(idx)
        return
      }
      this.movie.genres.push(genre)
    }
  },
  computed: {
    genreAssigned () {
      return this.movie.genres.map((genre) => {
        return genre.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  section {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.form-check {
  display: flex;
  justify-content: center;
  align-items: center;
  background: adjust-color($color: $main-gray, $lightness: 40%, $alpha: 1.0);
  transition: 0.4s ease;
  color: #000;
  overflow: hidden;
  label {
    width: 100%;
    height: 100%;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    left: 0;
    transform: scale(10);
    visibility: hidden;
    &:checked {
      + label {
        color: $main-blue;
        font-weight: bolder;
        text-decoration: underline;
      }
    }
  }
  label {
    margin: 0 auto;
  }
}

.actor, .director {
  background: adjust-color($color: $main-gray, $lightness: 50%, $alpha: 1.0);
  border-radius: $main-round;
}
</style>
