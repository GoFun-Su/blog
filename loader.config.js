const ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = [
            { //编译vue文件
                test: /\.vue/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                //babel-loader 只是起到一个通知者的角色，通知babel你需要干活了
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                //extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
                //use:指需要什么样的loader去编译文件,这里由于源文件是.styl所以选择stylus-loader
                //fallback:编译后用什么loader来提取css文件
                //publicfile:用来覆盖项目路径,生成该css文件的文件路径
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: [
                            {
                            loader: 'css-loader',
                            options: {
                                minimize: true, //css压缩
                                importLoaders: 1,
                                sourceMap: true
                                }
                            },
                            {
                                loader: 'stylus-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true, //css压缩
                                importLoaders: 1,
                                modules: true
                            }
                        }
                    ]
                })
            },
        
            {
                test: /\.(png|jpe?g|gif|svg|woff2|woff|svg|eot|ttf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
]