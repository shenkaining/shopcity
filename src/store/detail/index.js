import { reqGoodsInfo, reqAddCart } from '@/api'
// 引入生成 uuid的函数
import getUUID from '@/utils/uuid_token.js'
export const detail = {
  namespaced: true,
  state: {
    goodInfo: {},
    uuid: getUUID()
  },
  actions: {
    async getGoodInfo ({ commit }, skuId) {
      const goodInfo = await reqGoodsInfo(skuId)
      if (goodInfo.code === 200) {
        commit('GETGOODINFO', goodInfo.data)
      }
    },
    async addCart (context, { skuId, skuNum }) {
      const result = await reqAddCart(skuId, skuNum)
      // console.log(result)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  },
  mutations: {
    GETGOODINFO (state, data) {
      state.goodInfo = data
    }
  },
  getters: {
    // 因为一开始数据还没有获取到，返回空对象的属性就是返回了 undefined，详情组件再读取 undefined上的属性就会报错
    // 当属性为 undefined时 返回 空对象，就不会报错
    categoryView (state) {
      return state.goodInfo.categoryView || {}
    },
    skuInfo (state) {
      return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList (state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}
