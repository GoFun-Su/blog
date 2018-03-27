#s-su
##使用方法
```bash
1.npm install 
2.安装webpack和webpack-dev-server，这里用的是webpack 2.3.0和 webpack-dev-server 2.3.0
3.运行webpack进行打包(webpack build)，运行webpack-dev-server启动项目:http://localhost:8080
4. (webpack dll) 预编译静态资源，第1次使用时应该先执行一次这个。以后的开发中就不需要再执行了,但是不管用,(webpack -p --config webpack.dll.config.js --progress --profile --colors可以用这个替换尝试)

vue 
父子传值  https://www.cnblogs.com/daiwenru/p/6694530.html

