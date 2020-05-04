<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
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
    mounted() {
      setTimeout(() => {
        this._setSliderWidth();
        this._initSlider();
      }, 20) // 浏览器的刷新通常是17毫秒一次
    },
    methods: {
      _setSliderWidth() {
        console.log(this.children,111);

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
         this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横滚
          scrollY: false,
          momentum: false,  // 惯性
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true // 启用点击行为
        })
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