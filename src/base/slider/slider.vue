<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
        <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script type="text">
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
    props: {
      //  循环
      loop: {
        type: Boolean,
        default: true
      },
      // 自动
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 间隔时间
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        currentPageIndex: 0,
        dots: []
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth();
        // 初始化轮播图之前调用（未拷贝子元素，确保元素与索引长度一致）
        this._initDots();
        this._initSlider();
        // 自动轮播
        this._pay();
      }, 20) // 浏览器的刷新通常是17毫秒一次
    },
    methods: {
      _setSliderWidth() {

        this.children = this.$refs.sliderGroup.children

        let sliderWidth = this.$refs.slider.clientWidth
        let width = 0
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        
        if(this.loop) {
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'
        
      },
      // 初始化
      _initSlider() {
        // BScroll初始化之后会自动拷贝两分子元素，以便作循环滚动（所以初始化索引要在它之前，才不会多出两个拷贝的索引）
         this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横滚
          scrollY: false,
          momentum: false,  // 惯性
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
        })

        // 滚动完毕
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          // 如是循环状态，要减掉前面拷贝的索引
          if(this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex 

          if(this.autoPlay) {
            clearTimeout(this.timer)
            this._pay()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _pay() {
        // 展示是从第一个索引开始的（因初始化拷贝了两个子元素）
        let pageIndex = this.currentPageIndex + 1;
        if(this.loop) {
          pageIndex += 1
        }

        this.timer = setTimeout(() => {
          //pageIndex:横向滚动  0: 纵向滚动（设置为0就可以）
           this.slider.goToPage(pageIndex, 0, 400)
        },this.interval)
      }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>