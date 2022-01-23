<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{userName}}</a>
            <a @click="logout">&nbsp;|&nbsp; 退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo"> <img src="./images/logo.png" alt="" /></router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" placeholder="请输入要搜索的商品" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    // 全局事件总线，接收兄弟组件的信息
    // 兄弟组件的$emit一触发，$on中的回调就会触发
    this.$bus.$on('clearKeyword', () => {
      this.keyword = ''
    })
  },
  beforeDestroy () {
    // 组件销毁前解绑全局事件总线
    this.$bus.$off('clearKeyword')
  },
  computed: {
    ...mapGetters('user', ['userName'])
  },
  methods: {
    // 搜索框 搜索商品
    goSearch () {
      const loction = { name: 'search' }
      // 编程式导航
      // 以对像形式传参，路径中有占位符，如果参数为 空字符串，会导致路径缺失，可以传 undefined
      loction.params = { keyword: this.keyword || undefined }
      if (this.$route.query) {
        loction.query = this.$route.query
        // 解决编程式导航连续点击会报错的问题，也可以直接在router.js中修改push/replace方法
        // this.$router.push(loction, () => {}, () => {})
        this.$router.push(loction)
      }
    },
    // 退出登录
    async logout () {
      try {
        await this.$store.dispatch('user/userLogout')
        // 退出后返回home首页
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
