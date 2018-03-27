/* eslint-disable prefer-promise-reject-errors */
import {
  isRegExp,
  isString,
  isArray,
  isFunction,
  isEmpty,
  isNumber,
  series
} from './util'

import { rules } from './buildinRule'
import { messages } from './config'
/**
 * 验证规则：
 * 1：字段为空，使用默认值default代替
 * 2：是否是required字段
 * 3：使用type判断字段类型
 * 4: 使用check判断是否通过
 */
function validate (rule, ctx) {
  return new Promise((resolve, reject) => {
        //返回错误提示内容
        let proxy = (err) => {
            if(err){
                reject(msg[err]  || messages[err] || '输入的值不合法')
            }else {
                //当是自己填加的规则的时候
                reject('输入的值不合法')
            }
            
        }
        let { value } = ctx;
        //如果是自己添加的规则
        if (isFunction(rule)) {
            if (rule.call(this, value, ctx)) {
                return resolve()
            }else{
                return proxy()
            }
        };

        let {
          msg = messages,
          required,
          type,
          check
        } = rule

        //判断是否为空以及是否是必填
        if (isEmpty(value)) {
          // 必填
          if (required) {
            return proxy('required')
          } else if (required === false) { 
            // 非必填 ，返回成功
            return resolve()
          }
        }

        //验证其他规则
        // 验证类型，默认不写type为string
        let types = type
        if (types) {
          if (!isArray(types)) {
            types = [types]
          }
        } else {
          types = ['string']
        }

        let promises = types.map((type) => verify.bind(this, type, value, ctx, rule))

        series(promises).then(() => {
            if(check){
                if (isFunction(check)) {
                    var boo = check.call(this, value, ctx)
                    return isString(boo) ? reject(boo) : boo ? resolve() : proxy('check')
                }
            }
            resolve()
        }).catch(proxy)
    })
}


function verify (type, value, ctx, rule) {
  let {
    length
  } = rule

  return new Promise((resolve, reject) => {
    if (isString(type)) {
      switch (type) {
        case 'string':
          value = String(value)
          if(Array(length) && (value.length < length[0] || value.length > length[1])) {
            return reject('length')
          }
          resolve()
          break
        default:
          if (type in rules) {
            var boo = rules[type].call(this, value, ctx)
            return isString(boo) ? reject(new Error(boo)) : boo ? resolve() : reject(type)
          }

          resolve()
          break
      }
    } else if (isRegExp(type)) {
        if (!type.test(value)) {
            return reject('regexp')
        }
        resolve()
    }
  })
}
export default validate
