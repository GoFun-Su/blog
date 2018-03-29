import {
	isEmpty,
	isString,
	isMobile,
	isName,
	isEmail,
	isPassword,
	isRepassword,
	converterRole,
	series,
	rules
} from './util'
function validate(ctx){
	return new Promise((resolve,reject) =>{

		let {value,rule,key} = ctx
		let rules = rule.split("|")

		let proxy = (err) => {

			let {name,text} = err 
			let role = converterRole[name]

	      	if(text){
	      		reject(role+err.text)
	      	}else {
	      		reject(role+"格式不正确")
	      	}
	    }
			
		let promises = rules.map((type) => verify.bind(this, type, value, ctx))

		series(promises).then(() => {
			resolve()
		}).catch((err)=>{
			proxy(err);
		})  
		
	})
}

//new promise只能穿一个参数
function verify(type,value,ctx) {
	let {key} = ctx
	return new Promise((resolve, reject) => {
   		switch (type) {
   			case "required":
		        if (isEmpty(value)) {
		           return reject({name:key,text:"必填"})
		        }
		        resolve()
		        break;
		    case "mobile":
		    	if(!isMobile(value)) {
		    		return reject({name:key})
		    	}
		    	resolve()
		    	break;
		    case "name":
		    	if(!isName(value)) {
		    		return reject({name:key})
		    	}
		    	resolve()
		    	break;
		    case "email":
		    	if(!isEmail(value)) {
		    		return reject({name:key})
		    	}
		    	resolve()
		    	break;
		    case "password":
		    	if(!isPassword(value)) {
		    		return reject({name:key,text:"长度在3-10"})
		    	}
		    	resolve()
		    	break;
		    case "repassword":
		    	if(!isPassword(value)) {
		    		return reject({name:key,text:"长度在3-10"})
		    	}
		    	if(!isRepassword(value,this.password)) {
		    		return reject({name:key,text:"和密码不一致"})
		    	}
		    	resolve()
		    	break;
		    default:
			    if (type in rules) {
	            	var boo = rules[type].call(this, value, ctx)
	            	return boo ? resolve() : reject({name:type})
	          	}
	          	resolve()
	          	break
   		}
    })
}
export default validate