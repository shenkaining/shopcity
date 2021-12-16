<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  mounted () {
    //   子组件中的数据是从父组件通过 props属性 传递的
    // 组件中props属性的数据在 生命周期created阶段就已经准备完毕
    // 所以mounted时就已经有DOM结构了，所以子组件可以直接 new Swiper实例
    var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      // 开启自动播放
      autoplay: {
        pauseOnMouseEnter: true, // 鼠标悬停暂停自动播放
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false // 进行交互后 会停止自动播放
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
}
</script>

<style></style>
