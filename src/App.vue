<template>
  <div class="app-container">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: { Header, Footer },
  mounted () {
    //   钩子函数中调用vuex中actions中方法发送请求
    // 开启命名空间的模块，必须使用  模块名/方法名
    this.$store.dispatch('categoryList/getList')
  }
}
</script>

<style></style>
