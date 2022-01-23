import Vue from 'vue'
// 引入vee-validate
import Validate from 'vee-validate'
// 中文提示
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(Validate)

// 表单验证
Validate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages, // 将错误提示翻译成中文
    is: field => `${field}必须与密码一致` // 确认密码的配置项
  },
  // 将英文字段翻译成对应的中文
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})

// 自定义‘同意协议’的复选框的 验证规则
Validate.Validator.extend('agree', {
  validate: value => value,
  getMessage: field => field + '必须同意'
})
