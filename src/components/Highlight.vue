<template>
    <carousel :perPage=1>
        <slide v-for="item in items" :key="item.key">
            <div class="highlight">
                <div class="img-wall">
                    <img src="https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/15129560_1314610465236713_2777177848143797994_o.jpg?_nc_cat=0&oh=ef327c5808702d2bc6b60d8fac08c591&oe=5B396FD0">
                    <div class="detail">
                        <h2>{{ item.movie_title }}</h2>
                        <p>{{ item.movie_description }}</p>
                    </div>
                </div>
            </div>
        </slide>
    </carousel>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'
export default {
  name: 'Highlight',
  components: {Carousel, Slide},
  data () {
    return {
      items: [
        {key: 1, movie_title: 'Kavinny and His Scala', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.'},
        {key: 2, movie_title: 'Knowjeans and The Sony Mobile phone', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.'},
        {key: 3, movie_title: 'ต้อม สวยสังหาร', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.'},
        {key: 4, movie_title: 'มาวิน แหกคุกสะท้านนรก', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.'},
        {key: 5, movie_title: 'เด็มมี่คนน่ารักกับเพื่อนๆทั้งสี่', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.highlight {
    position: relative;
    .img-wall {
        position: relative;
        z-index: 0;
        width: 100%;
        height: 40vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            width: 100vw;
        }
        .detail {
            position: absolute;
            left: 0;
            top: 50%;
            margin: 10px;
            transform: translateY(-50%);
            min-width: 300px;
            max-width: 400px;
            z-index: 2;
            padding: 1em;
            background: gray;
        }
    }
}
</style>
