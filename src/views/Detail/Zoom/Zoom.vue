<template>
  <div class="spec-preview">
    <img :src="skuImgList[currentImg].imgUrl" />
    <div class="event" @mousemove="preview"></div>
    <div class="big">
      <img :src="skuImgList[currentImg].imgUrl"  ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: ['skuImgList'],
  data () {
    return {
      currentImg: 0
    }
  },
  mounted () {
    this.$bus.$on('currentImg', (index) => {
      this.currentImg = index
    })
  },
  beforeDestroy () {
    this.$bus.$off('currentImg')
  },
  methods: {
    // 放大镜功能
    preview (e) {
      const mask = this.$refs.mask
      const big = this.$refs.big
      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetHeight / 2
      // 限制滑块的活动范围
      if (left < 0)left = 0
      if (left > mask.offsetWidth) left = mask.offsetWidth
      if (top < 0) top = 0
      if (top > mask.offsetHeight) top = mask.offsetHeight
      // 动态设置滑块的坐标
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      // 根据滑块的2倍关系设置大图的坐标
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'
    }
  }
}
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
