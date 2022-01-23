import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'

export default {
  namespaced: true,
  state: {
    code: '',
    token: localStorage.getItem('token'),
    userInfo: {}
  },
  actions: {
    // 获取验证码请求
    async getCode ({ commit }, phone) {
      const result = await reqCode(phone)
      // console.log(result)
      if (result.code === 200) {
        // 这里接口设计原因要将验证码存放到仓库
        // 一般验证码应该是有发到用户手机上的
        commit('GETCODE', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册请求
    async userRegister ({ commit }, data) {
      const result = await reqRegister(data)
      // console.log(res)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户登录，获取服务器配发的 token
    async userLogin ({ commit }, data) {
      const result = await reqLogin(data)
      if (result.code === 200) {
        localStorage.setItem('token', result.data.token)
        commit('USERLOGIN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 通过 token 获取用户信息
    async getUserInfo ({ commit }) {
      const result = await reqUserInfo()
      // console.log(result)
      if (result.code === 200) {
        commit('GETUSERINFO', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录
    async userLogout ({ commit }) {
      const result = await reqLogout()
      // console.log(result)
      if (result.code === 200) {
        commit('USERLOGOUT')
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  },
  mutations: {
    GETCODE (state, code) {
      state.code = code
    },
    USERLOGIN (state, token) {
      state.token = token
    },
    GETUSERINFO (state, userInfo) {
      state.userInfo = userInfo
    },
    USERLOGOUT (state) {
      state.userInfo = {}
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  getters: {
    userName (state) {
      return state.userInfo.name
    }
  }
}
