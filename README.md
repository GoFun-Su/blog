#s-su
##使用方法
```bash
1.npm install 
2.安装webpack和webpack-dev-server，这里用的是webpack 2.3.0和 webpack-dev-server 2.3.0
3.运行webpack进行打包(webpack build)，运行webpack-dev-server启动项目:http://localhost:8080
4. (webpack dll) 预编译静态资源，第1次使用时应该先执行一次这个。以后的开发中就不需要再执行了,但是不管用,(webpack -p --config webpack.dll.config.js --progress --profile --colors可以用这个替换尝试)

vue 
父子传值  https://www.cnblogs.com/daiwenru/p/6694530.html


var a = b = {n:1}
//赋值 b={n:1},再把b赋值给a,即b和a指向相同的内存地址
//首先a={n:4}a指向另一个内存地址，和b指向的地址不同
//然后a.x等于a即a.x指向a此时指向内存地址的值
a.x = a = {n:4}
console.log(a.x)
console.log( a === b)

var a = 1;
var b = 1;
a===b true
//变量赋值是和对象赋值不同，对象赋的是引用地址，变量赋的是值

var vm = {};
var cache = {};
 vm._uid = 4;
const errorCache = cache[vm._uid] = cache[vm._uid] || {}
//首先cache[vm._uid]如果值存在等于某个值，或者等于空对象
//然后errorCache 执行cache[vm._uid]指向的内存地址.所以errorCache值的变化会引起cache[vm._uid]值的变化
errorCache[0] ={
	name:'9988'
}




