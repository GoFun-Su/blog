const webpack = require("webpack");
const path = require("path");

const loaderConfig = require("./loader.config")
const packageJson = require("./package")
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let vendors = Object.keys(packageJson.devDependencies || [])

module.exports = {
    resolve: {
        extensions: [".js", ".css"]

    },
    entry: {
        dll: ["vue"]/*vendors.filter((item) => {
                return item.indexOf('stylus') < 0  
        })*/
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]" // 这里跟 webpack.DllPlugin 里的 name 保持一致
    },
    plugins: [
        //// 使用DllPlugin插件编译上面配置的NPM包
        new webpack.DllPlugin({
            //// 会生成一个json文件，里面是关于dll.js的一些配置信息
            path: path.join(__dirname, "js", "[name]-manifest.json"),
            name: "[name]_[hash]" //path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包；
            //name 是 dll 暴露的对象名，要跟 output.library 保持一致；
            //context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。    
        }),
        new webpack.DefinePlugin({
             'process.env': {
                NODE_ENV: '"production"',
                STYLUS_COV:false//分离第三方库的时候容易报错，所以加上
              }
         })
    ],
    module: {
        loaders: loaderConfig
    },
    //https://segmentfault.com/q/1010000004399596
    node: {
      fs: "empty",
      net:"empty",
      tls:"empty",
      "aws-sdk":"empty",
      "child_process": "empty",
      "node-gyp":"empty"
    }

}