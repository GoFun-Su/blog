//实现了压缩js，分离第三方库（把dll拷贝到dist下，并且引入index.html），抽离css，
const path = require('path');
const webpack = require("webpack")
const loaderConfig = require("./loader.config.js")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const UglifyJsPlugin= require("uglify-js-plugin")
 module.exports = {
     entry: {
         index:'./src/main.js'
     },
     output: {
         filename: "[name].[hash].bundle.js",//名字+hash值
         path: path.resolve(__dirname, 'dist')
     },
     devServer: {
         contentBase: './dist',
         port: '8085', //设置默认监听端口，如果省略，默认为'8080'
         inline: true //设置为true，当源文件改变时会自动刷新页面
     },
     module: {
         loaders: loaderConfig
     },
     plugins: [
         new HtmlWebpackPlugin({ //输出html
             title: 'index',
             filename: 'index.html',
             template: path.resolve("./index.html"), //模板
             cache: true,
             inject: true
         }),
        new ExtractTextPlugin({ 
             //将css模块抽离出来,抽离的仅仅是import(.styl文件)里面的css,对于.vue里面的css不会抽离
             //如果有使用require引入样式文件，那么使用ExtractTextPlugin这部分样式代码是不会被抽取出来的
             filename: '[name].[hash].css',
             allChunks: true//所有分离文件的样式也会全部压缩到一个文件上
         }),
        //Vue loader 会自动读取项目下的 .babelrc 文件，获取到 presets 配置，从而自动编译箭头函数等语法糖。
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }), *///对js进行压缩
         new webpack.DllReferencePlugin({
             context: path.join(__dirname, "..", "dll"), // 这里要和 dll.config.js 中 webpack.DllPlugin 配置的 context 一致
             manifest: require("./js/dll-manifest.json") //context 需要跟之前保持一致，这个用来指导 Webpack 匹配 manifest.json 中库的路径；
             //manifest 用来引入刚才输出的 manifest.json 文件。  
         }),
         //把MyDll.dll.js拷贝到dist下，以方便引入到index.html里面
         new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, 'js'),
              to: path.resolve(__dirname, 'dist'),
              ignore: ['.*']
            }
          ]),
        // 将 vendor.dll.js 插入HTML里
        //https://anran758.github.io/blog/2018/01/06/%E4%BC%98%E5%8C%96Vue%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%9E%84%E5%BB%BA%E9%80%9F%E5%BA%A6/
       new HtmlWebpackIncludeAssetsPlugin({
            assets: ['MyDll.dll.js'],
            files:  ['index.html'],
            append: false
        }),
        new webpack.DefinePlugin({
             'process.env': '"production"'
         }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            axios: 'axios',
            Qs:"qs"
        })
     ],
     //配置模块如何解析
     resolve: { 
         //后缀不需要加，比如以后在写hello.vue的时候不需要加.vue，只用hello就可以
         extensions: ['.js', '.vue', '.css','.styl',".json"],
         alias: {
            //创建 import 或 require 的别名，来确保模块引入变得更简单
            //也可以在给定对象的键后的末尾添加 $，以表示精准匹配
            '@': path.resolve('./src'),
            //import Test2 from 'index$/file.js'; // 精确匹配，触发普通解析
            'index$': '.src/js/index.js',
        }
     },
     node: {
      fs: "empty"
    }
 };