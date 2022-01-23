import { reqShopCartList, reqDeleteGoods, reqCheckedState } from '@/api'

export const shopCart = {
  namespaced: true,
  state: {
    shopCartInfo: []
  },
  actions: {
    // 获取购物车商品列表
    async getShopCartList ({ commit }) {
      const result = await reqShopCartList()
      // console.log(result)
      if (result.code === 200) {
        commit('GETSHOPCARTLIST', result.data)
      }
    },
    // 删除购物车某件商品
    async deleteGoods ({ commit }, skuId) {
      const result = await reqDeleteGoods(skuId)
      // console.log(result)
      // 让组件可以捕获请求失败的信息
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 切换购物车商品的选中状态
    async changeCheckedState ({ commit }, { skuId, isChecked }) {
      const result = await reqCheckedState(skuId, isChecked)
      // console.log(result)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除所有选中的商品
    deleteAllChecked ({ dispatch, getters }) {
      // context中包含dispatch、state、commit、getters等方法/数据，相当于是小型仓库
      // 没有能一下子删除所有选中的接口，就需要重复调用删除单个商品的请求
      const promiseAll = []
      getters.cartInfo.cartInfoList.filter(item => item.isChecked === 1).forEach(item => {
        const promise = dispatch('deleteGoods', item.skuId)
        promiseAll.push(promise)
      })
      // 使用Promise.all 方法处理元素为Promise的数组(返回一个Promise实例)，只要其中一项失败，返回的结果就是失败
      return Promise.all(promiseAll)
    },
    // 修改所有商品的选中状态
    changeAllState ({ dispatch, state }, isChecked) {
      // console.log(state.shopCartInfo[0].cartInfoList)
      const promiseAll = []
      // 先筛选出与全选按钮状态不同的商品，遍历修改这些商品的状态与全选按钮一致
      state.shopCartInfo[0].cartInfoList.filter(item => item.isChecked !== isChecked).forEach(item => {
        const promise = dispatch('changeCheckedState', { skuId: item.skuId, isChecked })
        promiseAll.push(promise)
      })
      return Promise.all(promiseAll)
    }
  },
  mutations: {
    GETSHOPCARTLIST (state, data) {
      state.shopCartInfo = data
    }
  },
  getters: {
    cartInfo (state) {
      // 避免读取属性时读取到 undefined上的属性，就会报错
      return state.shopCartInfo[0] || {}
    }
  }
}
