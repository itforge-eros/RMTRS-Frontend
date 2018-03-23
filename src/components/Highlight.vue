<template>
    <carousel :perPage=1>
        <slide v-for="item in items" :key="item.key">
            <div class="highlight">
                <div class="img-wall">
                    <img :src="item.img">
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
        {key: 1, movie_title: 'Kavinny and His Scala', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/18518213_1511152025582555_5313532748935915827_o.jpg?oh=ff0108189976cca30758d2a1c5e61576&oe=5B3F5069'},
        {key: 2, movie_title: 'Knowjeans and The Sony Mobile phone', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/18489733_1508156445882113_715520888840823365_o.jpg?_nc_cat=0&oh=efa6a28a6b683e8217a0ed83656faf84&oe=5B2F94E5'},
        {key: 3, movie_title: 'ต้อม สวยสังหาร', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t31.0-8/14086438_1076154942420779_4206280432844917790_o.jpg?_nc_eui2=v1%3AAeGmxbWW6JmsqQW-vqCVF-NMGU-_Bpy6lzvtjv9PjJjZa8Rez7fUWU2FFuS6OBLXzJqYfybkJOQRYYx0XUqrKl64yp-p3_zg0PSaxupdz1VCFQ&oh=a8a9e2e50ce1ca59730cdc034472ddc1&oe=5B36A599'},
        {key: 4, movie_title: 'มาวิน แหกคุกสะท้านนรก', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-0/p206x206/12360081_916727381729816_7998173448882692126_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeEcG68VIb3KP5fOI7eMmZSIr9DdfXm2BjAT1NdegWpK-0wZ_5RLJOLfWitMutYKFvzD9RzDKqqJ9D0jiL2x2_TxbG6xrVurgucMrKRubaWGVA&oh=0a5fc82cbdf7d8bfbec2c24c9c8bf257&oe=5B492F62'},
        {key: 5, movie_title: 'เด็มมี่คนน่ารักกับเพื่อนๆทั้งสี่', movie_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem, praesentium incidunt ex perspiciatis commodi ducimus sed. Qui reiciendis perspiciatis eveniet impedit, facilis optio corrupti porro dolore ut explicabo totam.', img: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-0/p206x206/22815607_1672934592737630_1323844413626993099_n.jpg?_nc_eui2=v1%3AAeEP9ZpJZ8t5ikvVMZ9TMYlh7aMWwq-oSgma6gIWkMwt5L2bdBxHpmtjcnkZyz6e-gOOJDk93qGrO6Y3AkUBDwiMeZmdYsf3o5ufX1AQaLez1w&oh=7bf5c5cfa90a148eeabbbff1806cf751&oe=5B37A825'}
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
        height: 60vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            position: absolute;
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
            background-color: rgba($color: #ffffff, $alpha: 0.8);
            border-radius: $main-round;
        }
    }
}
</style>
