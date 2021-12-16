import { reqSearchInfo } from '@/api'
export const search = {
  namespaced: true,
  state: {
    searchInfo: {}
  },
  actions: {
    // 请求中传递的参数默认为空对象
    async getSearchInfo ({ commit }, params = {}) {
      const searchInfo = await reqSearchInfo(params)
      // console.log(searchInfo)
      if (searchInfo.code === 200) {
        commit('GETSEARCHINFO', searchInfo.data)
      }
    }
  },
  mutations: {
    GETSEARCHINFO (state, searchInfo) {
      state.searchInfo = searchInfo
    }
  },
  getters: {
    // 数据有很多层时，可以使用 getters 导出想要的数据，调用时更方便
    goodsList (state) {
      // 考虑到如果网速较慢会出现state中数据还是一个 空对象，返回属性会是undefined
      return state.searchInfo.goodsList || [] // 只要要返回一个空数组才能让组件进行遍历
    },
    attrsList (state) {
      return state.searchInfo.attrsList || []
    },
    trademarkList (state) {
      return state.searchInfo.trademarkList || []
    }
  }
}
