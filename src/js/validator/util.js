
export const rules = {}

// 添加新的规则
export function addValidation (type, handler) {
  rules[type] = handler
}

// 手机号(中国大陆)
addValidation('mobile', function (value) {
  return /^(\+?0?86-?)?1[34578]\d{9}$/.test(value)
})

const toString = (obj) => Object.prototype.toString.call(obj)

export function isString (obj) {
  return toString(obj) === '[object String]'
}
export function isEmpty (obj) {
  if (obj == null) return true
  if (typeof obj.length === 'number') return obj.length === 0
  return false
}

export function isMobile(val) {
	return val.length == 11 && /^1[3|4|5|7|8|][0-9]{9}$/.test(val)
}

export function isName(val) {
	return  /^[a-zA-Z0-8_]{6,15}$/.test(val) 
}

export function isEmail(val) {
	return  /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(val)
}

export function isLength(val) {
	return  /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(val)
}

export function isPassword(val) {
	return  val.length <= 10 && val.length >=3
}
export function isRepassword(val,val2) {
	return  val === val2
}

export const  converterRole = {
		mobile:"手机号",
		password:"密码",
		name:"用户名",
		repassword:"确认密码",
		email:"邮箱"
}


/**
 * promise 顺序懒执行
 * @param tasks 函数列表，返回Promise
 * @returns {Promise}
 */
export function series (tasks) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(tasks)) {
      var result = []
      var i = 0
      var length = tasks.length
      if (length === 0) {
        return resolve(result)
      }

      run()

      function run () {
        var task = tasks[i]
        Promise.resolve(task()).then((res) => {
          result[i] = res
          i++
          if (i < length) {
            run()
          } else {
            resolve(result)
          }
        }).catch(reject)
      }
    } else {
      reject(new Error('Series Methods must be provided an Array'))
    }
  })
}
