import { reqUserAddressList, reqOrderInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    userAddress: [],
    orderInfo: {}
  },
  actions: {
    async getUserAddress ({ commit }) {
      const result = await reqUserAddressList()
      // console.log(result)
      if (result.code === 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },
    async getOrderInfo ({ commit }) {
      const result = await reqOrderInfo()
      // console.log(result)
      if (result.code === 200) {
        commit('GETORDERINFO', result.data)
      }
    }
  },
  mutations: {
    GETUSERADDRESS (state, addressList) {
      state.userAddress = addressList
    },
    GETORDERINFO (state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  getters: {}
}
