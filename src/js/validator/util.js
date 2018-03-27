/* eslint-disable no-inner-declarations */
const toString = (obj) => Object.prototype.toString.call(obj)

export function isRegExp (obj) {
  return toString(obj) === '[object RegExp]'
}

export function isString (obj) {
  return toString(obj) === '[object String]'
}

export function isArray (obj) {
  return toString(obj) === '[object Array]'
}

export function isFunction (obj) {
  return toString(obj) === '[object Function]'
}

export function isNumber (obj) {
  return toString(obj) === '[object Number]'
}

export function isObject (obj) {
  return obj != null && typeof obj === 'object'
}

export function isEmpty (obj) {
  if (obj == null) return true
  if (typeof obj.length === 'number') return obj.length === 0
  return false
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
        //task类似调用verify函数，对tasks数组循环调用verify函数
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
