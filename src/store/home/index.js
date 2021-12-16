// 引入请求数据的api
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
export const home = {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  actions: {
    async getList ({ commit }) {
      const res = await reqCategoryList()
      // console.log(list)
      if (res.code === 200) {
        commit('GETLIST', res.data)
      }
    },
    async getBannerList ({ commit }) {
      const bannerList = await reqBannerList()
      // console.log(bannerList)
      if (bannerList.code === 200) {
        commit('GETBANNERLIST', bannerList.data)
      }
    },
    async getFloorList ({ commit }) {
      const floorList = await reqFloorList()
      // console.log(floorList)
      if (floorList.code === 200) {
        commit('GETFLOORLIST', floorList.data)
      }
    }
  },
  mutations: {
    GETLIST (state, data) {
      // console.log(data)
      state.categoryList = data
    },
    GETBANNERLIST (state, data) {
      state.bannerList = data
    },
    GETFLOORLIST (state, data) {
      state.floorList = data
    }
  }
}
