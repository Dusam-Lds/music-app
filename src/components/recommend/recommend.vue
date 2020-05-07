<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <!-- better-scroll 父子集关系 子集第一个元素才会滚动 -->
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
        <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <!-- needsclick 解決初始化時click：true | fastclick的點擊事件衝突 -->
                <img  class="needsclick" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
            <li @click="selectItem(item)" v-for="(item,index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" @load="loadImage" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text">
import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      recommends: [
        {
          linkUrl: '',
          picUrl: 'http://p1.music.126.net/43-rrmmQhBPlS3UIu56t1A==/109951164955417555.jpg?imageView&quality=89'
        },{
          linkUrl: '',
          picUrl: 'http://p1.music.126.net/dwxGxPb9XPd3PnutAOgk2w==/109951164955466538.jpg?imageView&quality=89'
        },{
          linkUrl: '',
          picUrl: 'http://p1.music.126.net/QU37G-7IgHXwD9-lqOv8aw==/109951164955495523.jpg?imageView&quality=89'
        }
      ],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if(res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      }).catch(err => {
        console.log(err,1111)
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>