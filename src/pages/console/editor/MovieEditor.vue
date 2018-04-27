<template>
  <div id="editor">
    <div class="row">
      <div class="col-12 p-0">
        <h3 v-if="movie !== null" class="header py-2 px-4">Editing : {{movie.en_title}}</h3>
      </div>
    </div>
    <form v-if="movie !== null">
      <div class="row">
        <div v-if="!exclude.includes(key)" :class="formMeta[key][1]" v-for="(meta, key) in formMeta" :key="key">
          <label :for="key">{{ formMeta[key][0] }}</label>
          <input v-model="movie[key]" v-if="formMeta[key][2] === 'text'" type="text" class="form-control" :id="key">
          <datepicker @opened="setSelectedDatepicker(key)" @selected="setDateData" wrapper-class="box-datepicker" calendar-class="design" input-class="form-control read-only-except" v-else-if="formMeta[key][2] === 'date'" :value="movie[key]"></datepicker>
        </div>
        <div class="form-group col-12 col-md-3" v-else-if="key === 'rate'">
          <label for="rate">Rate</label>
          <select class="form-control" id="rate">
            <option selected>Choose...</option>
            <option v-for="(data, key) in formMeta.rate" :key="key" :value="key">{{ data }}</option>
          </select>
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
            <h4 class="header py-2 px-4">Actor</h4>
          </div>
        </div>
        <div class="row actor my-2" v-for="(actor, key, index) in movie.actors" :key="index">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.actors" :key="inKey">
            <label :for="actor.id+inKey">{{ formMeta.actors[inKey] }}</label>
            <input :disabled="editing.actor.id !== actor.id" type="text" class="form-control" :id="actor.id+inKey" v-model="actor[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div v-if="editing.actor.id !== actor.id" class="col">
                <button @click="editMode('actor', actor, true)" class="btn" style="color: blue">Edit</button>
                <button class="btn" style="color: red">Delete</button>
              </div>
              <div v-else class="col">
                <button class="btn" style="color: green">Save</button>
                <button @click="editMode('actor', director, false)" class="btn" style="color: blue">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row actor my-2 add" v-if="adding.actor.state">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.actors" :key="inKey">
            <label :for="'add-actor-'+inKey">{{ formMeta.actors[inKey] }}</label>
            <input :disabled="adding.actor.id !== null" type="text" class="form-control" :id="'add-actor-'+inKey" v-model="adding.actor[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div class="col">
                <button class="btn" style="color: green" @click="persistActor">Add</button>
                <button class="btn" style="color: red" @click="addingActor(false)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label for="actor-suggestion">Existing Actors</label>
            <select size="6" class="form-control" id="actor-suggestion">
              <option @click="clearAdding('actor')">Create new one</option>
              <option @click="setExistedActor(data)" v-for="data in actor" :key="data.id">{{ data.fname }} {{ data.mname }} {{ data.lname }}</option>
            </select>
          </div>
        </div>
        <div class="actor-add" v-show="!adding.actor.state">
          <div class="row">
            <div class="col-12 p-0">
              <button @click="addingActor(true)" class="btn">Add an actor</button>
            </div>
          </div>
        </div>
      </section>
      <hr>
      <section id="production">
        <div class="row">
          <div class="col-12 p-0">
            <h4 class="header py-2 px-4">Production</h4>
          </div>
        </div>
        <div class="row production my-2" v-for="(production, index) in movie.productions" :key="index">
          <div class="form-group col-12 col-md-9 pt-2">
            <label :for="'production-'+production.key">{{ formMeta.productions.name }} : {{index+1}}</label>
            <input :disabled="editing.production.id !== production.id" type="text" class="form-control" :id="'production-'+production.key" v-model="production.name">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div v-if="editing.production.id !== production.id" class="col">
                <button @click="editMode('production', production, true)" class="btn" style="color: blue">Edit</button>
                <button class="btn" style="color: red">Delete</button>
              </div>
              <div v-else class="col">
                <button class="btn" style="color: green">Save</button>
                <button @click="editMode('production', director, false)" class="btn" style="color: blue">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row director my-2 add" v-if="adding.production.state">
          <div class="form-group col-12 col-md-9 pt-2">
            <label for="add-production">{{ formMeta.productions.name }}</label>
            <input type="text" :disabled="adding.production.id !== null" class="form-control" id="add-production" v-model="adding.production.name">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div class="col">
                <button class="btn" style="color: green">Add</button>
                <button @click="addingProduction(false)" class="btn" style="color: red">Cancel</button>
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label for="production-suggestion">Existing Production</label>
            <select size="6" class="form-control" id="production-suggestion">
              <option @click="clearAdding('production')">Create new one</option>
              <option @click="setExistedProduction(data)" v-for="data in production" :key="data.id">{{ data.name }}</option>
            </select>
          </div>
        </div>
        <div v-show="!adding.production.state" class="row">
          <div class="col-12 p-0">
            <button @click="addingProduction(true)" class="btn">Add an director</button>
          </div>
        </div>
      </section>
      <hr>
      <section id="director">
        <div class="row">
          <div class="col-12 p-0">
            <h4 class="header py-2 px-4">Director</h4>
          </div>
        </div>
        <div class="row director my-2" v-for="(director, key, index) in movie.directors" :key="index">
          <div class="form-group col-12 col-md-3 pt-2" v-for="(meta, inKey) in formMeta.directors" :key="inKey">
            <label :for="director.id+inKey">{{ formMeta.directors[inKey] }}</label>
            <input :disabled="editing.director.id !== director.id" type="text" class="form-control" :id="director.id+inKey" :value="director[inKey]">
          </div>
          <div class="col-12 col-md-3 pt-2 mb-3">
            <label>Action</label>
            <div class="row">
              <div v-if="editing.director.id !== director.id" class="col">
                <button @click="editMode('director', director, true)" class="btn" style="color: blue">Edit</button>
                <button class="btn" style="color: red">Delete</button>
              </div>
              <div v-else class="col">
                <button class="btn" style="color: green">Save</button>
                <button @click="editMode('director', director, false)" class="btn" style="color: blue">Cancel</button>
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
                <button class="btn" style="color: green" @click="persistDirector">Add</button>
                <button class="btn" style="color: red" @click="addingDirector(false)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label for="director-suggestion">Existing Directors</label>
            <select size="6" class="form-control" id="director-suggestion">
              <option @click="clearAdding('director')">Create new one</option>
              <option @click="setExistedDirector(data)" v-for="data in director" :key="data.id">{{ data.fname }} {{ data.mname }} {{ data.lname }}</option>
            </select>
          </div>
        </div>
        <div v-show="!adding.director.state" class="row">
          <div class="col-12 p-0">
            <button @click="addingDirector(true)" class="btn">Add an director</button>
          </div>
        </div>
      </section>
      <hr>
      <section id="genre">
        <div class="row">
          <div class="col-12 p-0">
            <h4 class="header py-2 px-4">Genre</h4>
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
import movieEditorFacade from '@/facades/MovieEditorFacade'
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
      production: null,
      actor: null,
      director: null,
      editing: {
        actor: {
          id: null
        },
        director: {
          id: null
        },
        production: {
          id: null
        }
      },
      adding: {
        actor: {
          id: null,
          state: false,
          fname: '',
          mname: '',
          lname: ''
        },
        director: {
          id: null,
          state: false,
          fname: '',
          mname: '',
          lname: ''
        },
        production: {
          id: null,
          state: false,
          name: ''
        }
      },
      exclude: ['actors', 'directors', 'productions', 'rate'],
      formMeta: {
        th_title: ['ชื่อไทย', 'form-group col-12 col-sm-6', 'text'],
        en_title: ['English Title', 'form-group col-12 col-sm-6', 'text'],
        release_date: ['Release Date', 'form-group col-12 col-md-3', 'date'],
        end_date: ['End Date', 'form-group col-12 col-md-3', 'date'],
        duration: ['Duration', 'form-group col-6 col-sm-3', 'text'],
        poster_url: ['Poster URL', 'form-group col-12 col-sm-6', 'text'],
        trailer_url: ['Trailer URL', 'form-group col-12 col-sm-6', 'text'],
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
          name: 'Production Name'
        },
        rate: {
          g: 'G',
          pg: 'PG',
          pg_13: 'PG 13',
          r: 'R',
          nc_17: 'NC 17'
        }
      }
    }
  },
  mounted () {
    this.fetchActor()
    this.fetchDirector()
    this.fetchProduction()
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
    fetchProduction () {
      movieEditorFacade.getProduction()
        .then(({data}) => {
          this.production = data
        })
        .catch(console.log)
    },
    fetchActor () {
      movieEditorFacade.getActor()
        .then(({data}) => {
          this.actor = data
        })
    },
    fetchDirector () {
      movieEditorFacade.getDirector()
        .then(({data}) => {
          this.director = data
        })
        .catch(console.log)
    },
    setDateData (date) {
      this.movie[this.selectedDatepicker] = moment(date).format('YYYY-MM-DD')
    },
    setSelectedDatepicker (key) {
      this.selectedDatepicker = key
    },
    addingDirector (mode) {
      this.adding.director.state = mode
      if (!mode) {
        this.clearAdding('director', false)
      }
    },
    addingActor (mode) {
      this.adding.actor.state = mode
      if (!mode) {
        this.clearAdding('actor', false)
      }
    },
    addingProduction (mode) {
      this.adding.production.state = mode
      if (!mode) {
        this.clearAdding('production', false)
      }
    },
    setExistedActor (data) {
      this.adding.actor.id = data.id
      this.adding.actor.fname = data.fname
      this.adding.actor.mname = data.mname
      this.adding.actor.lname = data.lname
    },
    setExistedProduction (data) {
      this.adding.production.id = data.id
      this.adding.production.name = data.name
    },
    setExistedDirector (data) {
      this.adding.director.id = data.id
      this.adding.director.fname = data.fname
      this.adding.director.mname = data.mname
      this.adding.director.lname = data.lname
    },
    clearAdding (key, mode = true) {
      if (['actor', 'director'].includes(key)) {
        this.adding[key] = {
          id: null,
          state: mode,
          fname: '',
          mname: '',
          lname: ''
        }
      } else {
        if (key === 'production') {
          this.adding[key] = {
            id: null,
            state: mode,
            name: ''
          }
        }
      }
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
            id: null,
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
            id: null,
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
    },
    editMode (section, data, mode) {
      if (mode) {
        this.editing[section].id = data.id
      } else {
        this.fetchMovie()
        this.editing[section].id = null
      }
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
  color: rgb(133, 133, 133);
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
      }
    }
  }
  label {
    margin: 0 auto;
  }
}

.actor, .director, .production {
  background: adjust-color($color: $main-gray, $lightness: 50%, $alpha: 1.0);
  border-radius: $main-round;
}
</style>
