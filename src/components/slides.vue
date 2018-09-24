 <template>
  <!-- 轮播图代码插件 -->
  <div class="slides">
    <div class="slide">
      <div class="slideshow">
        <ul>
          <li v-for="(img, index) in imgArray" v-show="index===mark" :key="index">
            <a href="#"><img :src='img'></a>
          </li>
        </ul>
      </div>
      <div class="bar">
        <span v-for="(item, index) in imgArray" :class="{ 'active':index===mark }" :key="index"></span>
      </div>
    </div>
  </div>
</template>
 <script>
export default {
    data() {
        return {
            mark: 0, //比对图片索引的变量
            imgArray: [
                "/static/img/1.jpg",
                "/static/img/2.jpg",
                "/static/img/3.jpg",
                "/static/img/4.jpg"
            ]
        };
    },
    methods: {
        autoPlay() {
            this.mark++;
            if (this.mark === 4) {
                //当遍历到最后一张图片置零
                this.mark = 0;
            }
        },
        play() {
            setInterval(this.autoPlay, 2500);
        },
        change(i) {
            this.mark = i;
        }
    },
    created() {
        this.play();
    }
};
</script>
 <style>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
.slides {
    width: 100%;
    height: 400px;
    margin: 0 auto;
}
.slide {
    width: 100%;
    height: 400px;
    margin: 0 auto;
    /* background-color: pink; */
    /* overflow: hidden; */
    position: relative;
}
.slideshow {
    width: 100%;
    height: 400px;
}
.slideshow li {
    position: absolute;
}
.slideshow img {
    width: 1500px;
    height: 400px;
    /* background-color: red; */
}
.bar {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 60px auto;
    z-index: 10;
    text-align: center;
}
.bar span {
    width: 5px;
    height: 5px;
    border: 1px solid;
    background: white;
    display: inline-block;
    margin-right: 10px;
    border-radius: 50%;
}
.active {
    background: red !important;
}
</style>
 