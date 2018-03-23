<template>
  <div class="wall">
    <Highlight :movieData="movieData" class="row"></Highlight>
    <div class="container">
      <div class="row">
        <movie-card v-for="movie in movieData" :key="movie.key" :title="movie.title" :img="movie.img"/>
      </div>
    </div>
  </div>
</template>

<script>
import Highlight from '../components/Highlight'
import MovieCard from '../components/MovieCard'
export default {
  name: 'Home',
  components: {Highlight, MovieCard},
  data () {
    return {
      movieData: [
        {key: 1, title: 'Kavinny and His Scala', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/18518213_1511152025582555_5313532748935915827_o.jpg?oh=ff0108189976cca30758d2a1c5e61576&oe=5B3F5069'},
        {key: 2, title: 'Knowjeans and The Sony Mobile phone', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/18489733_1508156445882113_715520888840823365_o.jpg?_nc_cat=0&oh=efa6a28a6b683e8217a0ed83656faf84&oe=5B2F94E5'},
        {key: 3, title: 'ต้อม สวยสังหาร', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/14086438_1076154942420779_4206280432844917790_o.jpg?_nc_eui2=v1%3AAeGmxbWW6JmsqQW-vqCVF-NMGU-_Bpy6lzvtjv9PjJjZa8Rez7fUWU2FFuS6OBLXzJqYfybkJOQRYYx0XUqrKl64yp-p3_zg0PSaxupdz1VCFQ&oh=a8a9e2e50ce1ca59730cdc034472ddc1&oe=5B36A599'},
        {key: 4, title: 'มาวิน แหกคุกสะท้านนรก', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-0/p206x206/12360081_916727381729816_7998173448882692126_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeEcG68VIb3KP5fOI7eMmZSIr9DdfXm2BjAT1NdegWpK-0wZ_5RLJOLfWitMutYKFvzD9RzDKqqJ9D0jiL2x2_TxbG6xrVurgucMrKRubaWGVA&oh=0a5fc82cbdf7d8bfbec2c24c9c8bf257&oe=5B492F62'},
        {key: 5, title: 'เด็มมี่คนน่ารักกับเพื่อนๆทั้งสี่', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-0/p206x206/22815607_1672934592737630_1323844413626993099_n.jpg?_nc_eui2=v1%3AAeEP9ZpJZ8t5ikvVMZ9TMYlh7aMWwq-oSgma6gIWkMwt5L2bdBxHpmtjcnkZyz6e-gOOJDk93qGrO6Y3AkUBDwiMeZmdYsf3o5ufX1AQaLez1w&oh=7bf5c5cfa90a148eeabbbff1806cf751&oe=5B37A825'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
