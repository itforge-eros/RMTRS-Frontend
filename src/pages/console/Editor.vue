<template>
  <div id="editor">
    <div class="row">
      <div class="col">
        <h1>Edit {{ mode }}</h1>
      </div>
    </div>
    <form class="row">
      <div :class="['data-edit', 'form-group', 'col-12', {'col-md-4': formMode.movie[key][1]}]" v-for="(data, key, index) in movie" :key="index">
        <div v-if="typeof(data) !== 'object' && key !== 'active'">
          <label :for="key">{{ key }}</label>
          <input v-if="formMode.movie[key][0] === 'text'" type="text" class="form-control" :id="key" :value="data" :disabled="key === 'id'">
          <textarea v-else-if="formMode.movie[key][0] === 'textarea'" type="text" class="form-control" :id="key" :value="data" :disabled="key === 'id'"></textarea>
        </div>
        <div v-else-if="key !== 'active'">
          <h2>{{ key }}</h2>
          <div class="pl-5 row" v-for="(subData, subIndex) in data" :key="subIndex">
            <div :class="['data-edit', 'form-group', 'col-12', {'col-md-4': formMode.movie[key][2][innerKey]}]" v-if="typeof(subData) === 'object' && innerKey !== 'active'" v-for="(innerData, innerKey) in subData" :key="innerKey">
              <label :for="innerKey">{{ innerKey }}</label>
              <input type="text" class="form-control" :id="innerKey" :value="innerData" :disabled="innerKey === 'id'">
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import facade from '@/facades/ScreeningFacade'
export default {
  name: 'Editor',
  data () {
    return {
      mode: '',
      movie: null,
      formMode: {
        movie: {
          id: ['text', true],
          th_title: ['text', false],
          en_title: ['text', false],
          synopsis: ['textarea', false],
          duration: ['text', true],
          poster_url: ['text', true],
          trailer_url: ['text', true],
          release_date: ['text', true],
          end_date: ['text', true],
          rate: ['text', true],
          active: ['text', true],
          actors: ['text', false, {id: true, fname: true, mname: true, lname: true, active: false}],
          directors: ['text', false, {id: true, fname: true, mname: true, lname: true, active: false}],
          genres: ['text', false, {id: true, name: true, active: false}],
          productions: ['text', false, {id: true, name: true, active: false}]
        }
      }
    }
  },
  mounted () {
    if (this.$route.path.indexOf('movie') !== -1) {
      this.mode = 'Movie'
      this.fetchMovie()
    }
  },
  methods: {
    fetchMovie () {
      facade.getMovie(this.$route.params.id)
        .then(({data}) => {
          this.movie = data
        })
        .catch(console.log)
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  padding: 10px;
}
</style>
