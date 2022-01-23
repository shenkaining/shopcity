<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- categoryName -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeName">×</i></li>
            <!-- keyword -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 可供选择的属性，参数为 数组，所以需要用 v-for -->
            <li class="with-x" v-for="(attr, index) in searchParams.props" :key="index">{{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @sendTrademark="getTrademark" @sendAttr="getAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="isOne" @click="changeOrder('1')">
                  <a href="javascript:;">综合<i v-show="isOne" class="iconfont" :class="isUp"></i></a>
                </li>
                <li :class="isTwo" @click="changeOrder('2')">
                  <a href="javascript:;">价格<i v-show="isTwo" class="iconfont" :class="isUp"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }} </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :totalData="total" :pageSize="searchParams.pageSize" :continue="5" @currentPage="getCurrentPage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data () {
    return {
      // 向服务器发送请求的参数
      searchParams: {
        // 一级ID
        category1Id: '',
        // 二级ID
        category2Id: '',
        // 三级ID
        category3Id: '',
        // 商品类名
        categoryName: '',
        // 关键字
        keyword: '',
        // 综合、价格升序、降序，默认为综合降序（1:desc）
        order: '1:desc',
        // 第几页
        pageNo: 1,
        // 每页商品数量
        pageSize: 10,
        // 商品的属性
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  // 要在发送请求前修改 请求参数的值
  beforeMount () {
    // 比较复杂的写法：手动给参数赋值
    // this.searchParams.keyword = this.$route.params.keyword
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.categoryName = this.$route.query.categoryName

    // 简单的写法：合并对象 Objet.assign(目标对象，合并项1，合并项2)。
    // 相同属性，后者的值会覆盖前者
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  // 结构加载完成后请求数据
  mounted () {
    this.getData()
  },
  computed: {
    // 从仓库获取每页展示的商品信息、总商品数量
    ...mapGetters('search', ['goodsList', 'total']),
    // 动态判断被选中的是 综合还是价格
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1 ? 'active' : ''
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1 ? 'active' : ''
    },
    // 判断显示升序还是降序的图标
    isUp () {
      return this.searchParams.order.indexOf('asc') !== -1 ? 'icon-up' : 'icon-down'
    }
  },
  watch: {
    // 监听组件实例中的 $route 的数据变化，一旦发生变化重新向服务器发送请求
    $route () {
      // 每次请求前将三级ID清空，避免再次请求时有上次的ID干扰
      // 值为 undefined时，该项就不会发送给服务器，可以节省网络占用
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 将新的路由参数合并到请求参数中
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      // console.log(this.searchParams)
      this.getData() // 再次发送请求获取新的数据渲染
    }
  },
  methods: {
    // 向服务器请求数据
    getData () {
      // search组件会多次向服务器请求，将请求封装成一个函数，每次需要用就调用函数
      this.$store.dispatch('search/getSearchInfo', this.searchParams)
    },
    // 删除categoryName的面包屑
    removeName () {
      // 删除面包屑后，需要把参数中的ID、name清空，再向服务器请求，返回默认数据进行渲染
      // undefined可以节约网络占用
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // this.getData() // 这里路由跳转时其实已经发送了请求
      if (this.$route.params) {
        this.$router.push({
          // 通过路由跳转来清除地址中的 query参数
          name: 'search',
          params: this.$route.params
        })
      }
    },
    // 删除keyword的面包屑
    removeKeyword () {
      this.searchParams.keyword = undefined
      // this.getData()  // 这里路由跳转时其实已经发送了请求
      if (this.$route.query) {
        this.$router.push({
          name: 'search',
          query: this.$route.query
        })
      }
      // 利用全局事件总线通知header组件中清空搜索框的内容
      this.$bus.$emit('clearKeyword')
    },
    // 从子组件接收品牌 信息
    getTrademark (val) {
      this.searchParams.trademark = `${val.tmId}:${val.tmName}`
      this.getData()
    },
    // 删除trademark面包屑
    removeTrademark () {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 从子组件接收属性信息
    getAttr (attr, attrVal) {
      const prop = `${attr.attrId}:${attrVal}:${attr.attrName}`
      // 通过 indexOf 方法数组去重
      if (this.searchParams.props.indexOf(prop) === -1) {
        this.searchParams.props.push(prop)
        this.getData() // 只有点击不同的属性才会重新获取数据
      }
    },
    // 删除属性的面包屑，他是数组渲染出来的，可以借助index删除点击的面包屑
    removeAttr (index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 点击切换综合/价格
    changeOrder (flag) {
      // 获取原始参数中的 id 和 asc/desc
      const state = this.searchParams.order.split(':')[0]
      const sort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      // 再次点击已选中的选项，切换升序/降序
      if (flag === state) {
        newOrder = `${flag}:${sort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击另一按钮就初始成 降序
        newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder
      this.getData()
    },
    // 从子组件接收点击的页面的 pageNo，并存进参数中向服务器发送请求
    getCurrentPage (val) {
      this.searchParams.pageNo = val
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
