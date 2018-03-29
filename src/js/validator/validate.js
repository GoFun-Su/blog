//bind：在指令第一次绑定到元素时调用，只会调用一次。
//可以在此钩子函数中，执行一次性的初始化设置。
//update：在包含指令的组件的 VNode 更新后调用，但可能之前其子组件已更新。
//指令的值可能更新或者还没更新，然而可以通过比较绑定的当前值和旧值，来跳过不必要的更新
//vnode.context 就是Vue的实例
//我们做项目的时候，经常一个根组件上挂着N个子组件，子组件上又可能挂着N个子组件。
//vnode.context获取的实例，是绑定该指令的组件的实例
import validate from './rule'
import { addValidation } from './util'
var validator = {};
const _ = {};
let uid = 0
// 错误缓存对象
const cache = {}
validator.install = (Vue, options = {}) =>{
	options = options || {};
    if (options.autoHint) {
        //引入错误提示的css
        require('./style.styl');
    }
	Vue.directive('validator', {
	 	inserted(el,binding,vnode){
	 		const vm = vnode.context;
	 		const errorCache = cache[vm._uid] = cache[vm._uid] || {}
	 		el.oldValue = el.value
	 		let id = uid++
      		el._erruid = id
      		let key = binding.arg
	 		const context = errorCache[el._erruid] = {
	 			key: key,
		        // 当前绑定的节点
		        target: el,
		        // 错误信息
		        msg: undefined,
		        // 保存的值
		        value: el.value,
		        oldValue: el.oldValue,
		        // 验证规则
		        rule: binding.value,
		        check: function () {
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
	    	const vm = vnode.context
	    	const errorCache = cache[vm._uid]
	    	const context = errorCache[el._erruid]
	    	context.value = el.value
	    	if(context.value === context.oldValue) return
	    	validate.call(vm, context).then(() => {
	    		context.oldValue = el.value
	    		context.msg = undefined
          		context.check()
	    	}).catch((err) =>{
	    		context.oldValue = el.value
	    		context.msg = err
          		context.check()
	    	})

	    	
	    }
	});

	Vue.prototype.$initValidate = function (model) {
        if (!model)return;
        _.__validationModel = model;
    }
    Vue.prototype.$allValidate = function () {
        return new Promise((resolve,reject)=>{
        	if(!_.__validationModel) {
        		resolve()
        	}else {
        		const errorCache = cache[this._uid]
        		if(!errorCache) {
        			resolve()
        		}
        		let promise = Object.keys(errorCache).map((key) => new Promise((resolve,reject) =>{
        				const context = errorCache[key]
				    	validate.call(this, context).then(() => {
				    		context.msg = undefined
			          		context.check()
			          		resolve()
				    	}).catch((err) =>{
				    		context.msg = err
			          		context.check()
			          		reject()
				    	})
        			})
        		)
        		Promise.all(promise).then(()=>{
        			resolve()
        		}).catch(()=>{
        			reject()
        		})
        		
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

validator.addValidation = addValidation
module.exports = validator;