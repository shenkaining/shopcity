<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide "  v-for="(img, index) in skuImgList" :key="img.id">
        <img :class="{active:cur == index}" :src="img.imgUrl" @click="clickImg(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['skuImgList'],
  data () {
    return {
      cur: 0
    }
  },
  watch: {
    // 监听传过来的图片数组，确保数据获取完成
    skuImgList (newVal) {
      // 通过 $nextTick 确保在结构渲染完成后生成 Swiper实例
      this.$nextTick(() => {
        const swiper = new Swiper('.swiper-container', {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // 配置项：一页显示几张轮播图
          // auto 根据宽度自适应, 3 代表每页显示3张图片
          slidesPerView: 3,
          // 3张图片为一组
          slidesPerGroup: 3
        })
      })
    }
  },
  methods: {
    clickImg (index) {
      this.cur = index
      this.$bus.$emit('currentImg', this.cur)
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
