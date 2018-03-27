/*import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import Validator from './customValidare'


Validator.localize(zh_CN)
//http://vee-validate.logaretm.com/examples.html
//https://github.com/baianat/vee-validate/compare/2.0.6...master
//https://www.cnblogs.com/alice-fee/p/8523420.html
//http://blog.csdn.net/o0__0/article/details/79031213

// 自定义validate  attributes就是 field
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '邮箱格式不正确哦',
      required: field=> field+'不能为空'
    },
    attributes:{
        email:'邮箱',
        password:'密码',
        telephone: '手机号',
        repassword:'确认密码'
      }
  }
};
Validator.localize(dictionary)

const config = {
  errorBagName: 'errors', 
  fieldsBagName: 'fields',
  delay: 100,   
  locale: 'zh_CN'
 
};


Validator.extend('telephone', {
  getMessage: fild => fild+"必须是11位数字",
  validate: value=>{
    return value.length == 11 && /^1[3|4|5|7|8|][0-9]{9}$/.test(value)
  }
})

Validator.extend('password', {
  getMessage: fild => fild+"必须是8-16位非纯数字",
  validate: value=>{
    return /^(?![0-9]*$)[a-zA-Z0-9_]{8,16}$/.test(value)
  }
})


Validator.extend('repassword', {
  getMessage: fild => fild+"两次输入密码不一致",
  validate: (value,val2)=>{
    return value === val2
  }
})

Vue.use(VeeValidate,config)
*/