//bind：在指令第一次绑定到元素时调用，只会调用一次。
//可以在此钩子函数中，执行一次性的初始化设置。
//update：在包含指令的组件的 VNode 更新后调用，但可能之前其子组件已更新。
//指令的值可能更新或者还没更新，然而可以通过比较绑定的当前值和旧值，来跳过不必要的更新
/*el.oninput= function(){
	alert(el.value)
};
el.onblur= function(){
	//失去光标的时候验证alert(el.value)
}*/

//vnode.context 就是Vue的实例
//我们做项目的时候，经常一个根组件上挂着N个子组件，子组件上又可能挂着N个子组件。
//vnode.context获取的实例，是绑定该指令的组件的实例
import validate from './rule'
import { isObject } from './util'

var validator = {};
const _ = {};
validator.install = (Vue, options = {}) =>{
	options = options || {};
    if (options.autoHint) {
        //引入错误提示的css
        require('./style.styl');
    }

    let { field = 'errors' } = options
    let uid = 0

  	// 错误缓存对象
  	const cache = {}
  	Vue.errorCache = cache
  	// 给vue实例添加errors属性
  	Vue.mixin({
    	data () {
      		return {
        		[field]: {}
      		}
    	}
  	})
	 Vue.directive('validator', {
	 	inserted(el,binding,vnode){
	 		const vm = vnode.context
      		const errorCache = cache[vm._uid] = cache[vm._uid] || {}
	 		let id = uid++
      		el._erruid = id
      		// 对错误对象设置属性
		    // 从dom节点获取key作为属性
		    // 如果还不存在用指令的arg作为参数，如果存在多个这样的arg会新的会覆盖久的
		    // 建议都设置一个key
		    let value = binding.value
		    let key
		    if (!key) {
		        key = el.getAttribute('data-key')
		     }
		    if (!key) {
		        key = binding.arg
		    }
		    Vue.set(vm[field], key, undefined)
		    // 设置一份上下文, 用于通信
		    const context = errorCache[id] = {
		        // errors的key
		        key: key,
		        // 当前绑定的节点
		        target: el,
		        // 错误信息
		        msg: undefined,
		        // 保存的值
		        value: value,
		        oldValue: value,
		        // 验证规则
		        rule: binding.arg,
		        // 验证函数
		        check: function () {
		          vm.errors[key] = this.msg

		          // 对错误进行展示
		          if (options.autoHint) {
		            if (this.msg) {
		              this.msgEl.innerHTML = this.msg
		              this.el.style.display = null
		            } else {
		              this.msgEl.innerHTML = ''
		              this.el.style.display = 'none'
		            }
		          }
		        }
		    }
		    if (options.autoHint) {
	        	context.el = autoHint.call(this, el)
	        	context.msgEl = context.el.querySelector('.err-tip-msg')
	      	}
	 	},
	    update (el,binding,vnode) {
	    	//update 实时验证
		    const vm = vnode.context
	      	if (!_.__validationModel) return

	      	const errorCache = cache[vm._uid]
	      	const context = errorCache[el._erruid]
	      	context.value = binding.value
	      	context.oldValue = binding.oldValue
		      	// 刚进页面和值没有更改不进行校验,但对于引用类型不拦截
		   if (context.value === context.oldValue && !isObject(context.value)) return

		    // 验证规则
		    var validationModel = _.__validationModel[binding.arg]
		    //或代表是自己添加的规则
	    	if(validationModel){
            	validate.call(vm, validationModel, context).then(() => {
            		//返回的状态resove()
		          	context.msg = undefined
		          	context.check()
		        }).catch((err) => {
		        	//返回的状态reject()
		          	context.msg = err
		          	context.check()
		        })
		    }
		},
	});

	Vue.prototype.$initValidate = function (model) {
        if (!model)return;
        _.__validationModel = model;
    }


    Vue.prototype.$allValidate = function () {
        return new Promise((resolve, reject) => {
	      	if (!_.__validationModel) {
	        	resolve()
	      	} else {
	        	// 实例对应对错误缓存对象
	        	const errCache = cache[this._uid]
	        	if (!errCache) {
	          		return resolve()
	        	}
	        	const promises = Object.keys(errCache).map((key) => new Promise((resolve, reject) => {
	          		const context = errCache[key]
	          		if (!context) {
	            		return resolve()
	          		}
	          		// 验证规则
	          		const validationModel = _.__validationModel[context.rule]
	          		if (validationModel) {
	            		validate.call(this, validationModel, context).then(() => {
	              			context.msg = undefined
	              			context.check()
	              			resolve()
	            		}).catch((err) => {
	              			context.msg = err
	             	 		context.check()
	              			reject(err)
	            		})
	          		} else {
	            		resolve()
	          		}
	        	}))

	        	Promise.all(promises).then(() => { resolve() }).catch(reject)
	      	}
    	})
    }

}    
// 自动提示
function autoHint (el) {
  var hint = document.createElement('div')
  hint.setAttribute('class', 'err-tip-wrap')
  hint.innerHTML = '<div class="err-tip"><div class="err-tip-msg"></div></div>'
  hint.style.display = 'none'
  before(hint, el)
  return hint
}

function before (el, target) {
  target.parentNode.insertBefore(el, target)
}
module.exports = validator;