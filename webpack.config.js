const path = require("path");
//自动生成html并引入相关资源的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//自动清除老的编译文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  optimization: { minimize: false }, // 关闭代码压缩，可选
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  cache: false,
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: { arrowFunction: false }, // 关闭webpack的箭头函数以兼容ie，可选
  },
  //设置哪些文件可以作为模块引入
  resolve: { extensions: [".ts", ".js",'.scss'] },
  //制定webpack打包时要使用的模块
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  //制定环境的插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //要兼容的浏览器
                    targets: { chrome: "103" },
                    //corejs版本
                    corejs: "3",
                    //使用corejs的方式 - 按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          { loader: "ts-loader" }, //从后往前执行，先用ts-loader
        ],
        exclude: "/node_modules/",
      },
      {
        test: /\.s(a|c)ss$/,
        use:[
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins:[
                  [
                    "postcss-preset-env",
                    { 
                      browsers:"last 2 versions",
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader",
        ]
      },
    ],
  },
  //配置plugin插件
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({ title: "TS测试" }),
    new HtmlWebpackPlugin({ template: "src/index.html" }),
  ],
};
