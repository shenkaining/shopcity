<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item) in shopCartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1" @change="changeCheckedState(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <button class="mins"  @click="changeNum('sub',-1,item)">-</button>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="changeNum('change',$event.target.value,item)">
            <button class="plus" @click="changeNum('add',1,item)">+</button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum*item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteGoods(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked&&shopCartList.length>0" @change="changeAllState">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCheckedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle.js'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  data () {
    return {
      isSub: false
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    // 请求得到的购物车数据
    ...mapGetters('shopCart', ['cartInfo']),
    // 提取返回数据中我们需要的商品数据
    shopCartList () {
      return this.cartInfo.cartInfoList || []
    },
    // 计算购物车内商品总价
    totalPrice () {
      // 先使用 filter方法筛选数组中符合条件的元素
      // 再对数组使用 reduce方法可以进行 数字的累加，他有返回值
      const totalPrice = this.shopCartList.filter(item => item.isChecked === 1).reduce((amt, item) => {
        // eslint的默认设置中 return后面不能跟赋值语句，但可以用括号包起来解决
        return (amt += item.skuNum * item.skuPrice)
      }, 0)
      return totalPrice
    },
    // 计算选中的商品重量
    totalCheckedNum () {
      // 先使用 filter方法筛选数组中符合条件的元素
      // 再对数组使用 reduce方法可以进行 数字的累加，他有返回值
      const totalCheckedNum = this.shopCartList.filter(item => item.isChecked === 1).reduce((amt, item) => {
        // eslint的默认设置中 return后面不能跟赋值语句，但可以用括号包起来解决
        return (amt += item.skuNum)
      }, 0)
      return totalCheckedNum
    },
    // 判断全选按钮
    allChecked () {
      // 对数组使用 every方法遍历每一个元素是否符合某项条件，都符合返回true，有不符合的就返回false
      const isChecked = this.shopCartList.every(item => item.isChecked === 1)
      return isChecked
    }
  },
  methods: {
    // 封装请求数据的函数
    getData () {
      this.$store.dispatch('shopCart/getShopCartList')
    },
    // 向服务器发送请求增加/减少商品数量，然后向服务器请求修改后的数据
    // 进行节流处理
    changeNum: throttle(async function (type, valueNum, sku) {
      // console.log('修改购物车商品数量', type, valueNum, sku)
      let a = 0
      switch (type) {
        // 点击+1按钮
        case 'add':
          a = 1
          break
        // 点击-1按钮
        case 'sub':
          a = sku.skuNum > 1 ? -1 : 0
          break
        // 在input框中直接修改
        case 'change':
          if (isNaN(valueNum * 1) || valueNum < 1) {
            a = 0
          } else {
            a = parseInt(valueNum) - sku.skuNum
          }
          break
      }
      // 每次修改商品数量，向服务器发送请求
      try {
        await this.$store.dispatch('detail/addCart', { skuId: sku.skuId, skuNum: a })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000),

    // 向服务器请求删除商品，然后请求获取新的数据
    async deleteGoods (skuId) {
      // 捕获请求失败的情况并提示用户
      try {
        await this.$store.dispatch('shopCart/deleteGoods', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改商品选中状态
    async changeCheckedState (item, e) {
      try {
        const isChecked = e.target.checked ? 1 : 0
        // console.log(isChecked)
        await this.$store.dispatch('shopCart/changeCheckedState', { skuId: item.skuId, isChecked: isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有已选中的商品
    async deleteAllChecked () {
      try {
        await this.$store.dispatch('shopCart/deleteAllChecked')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选按钮切换所有商品的状态
    async changeAllState (e) {
      try {
        const isChecked = e.target.checked ? 1 : 0
        await this.$store.dispatch('shopCart/changeAllState', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 200px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 18px;
              text-align: center;
              padding: 8px 0;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 18px;
              text-align: center;
              padding: 8px 0;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }

</style>
