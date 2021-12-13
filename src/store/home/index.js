// 引入请求数据的api
import { reqCategoryList } from '@/api'
export const categoryList = {
  namespaced: true,
  state: {
    categoryList: []
  },
  actions: {
    async getList ({ commit }) {
      const res = await reqCategoryList()
      // console.log(list)
      if (res.code === 200) {
        commit('GETLIST', res.data)
      }
    }
  },
  mutations: {
    GETLIST (state, data) {
      // console.log(data)
      state.categoryList = data
    }
  }
}
