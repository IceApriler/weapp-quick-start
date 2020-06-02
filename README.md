# weapp-quick-start

<!-- 构建帮助 start -->

该项目为`小程序项目开发模板`，目录和通用工具已经构建好，可以快速启动前端开发。
本项目长期更新，使用`方式二`创建项目时记得先拉取最新代码。

## 开始创建新项目

### 一、创建仓库

在[`Gitlab`](http://10.10.10.10/)创建一个新的项目，假设新项目名为`my-project`, 获取到项目的地址为`http://my-project.git`。

### 二、使用模板

```bash
git clone git@github.com:IceApriler/weapp-quick-start.git # 克隆weapp-quick-start至本地
git clone http://my-project.git # 克隆新项目至本地
```
将`weapp-quick-start`中的所有文件（**.git除外**），复制到新项目`my-project`中，然后将提交代码至远程仓库。

> 项目创建好后，照下面👇步骤进行配置。

### 三、配置项目

- [/src/config/index](/src/config/index.js) 项目配置文件，配置`baseApi`。
- 全局检索`weapp-quick-start`，将该名称替换为新项目的名称。
- 删除你现在正在浏览的`开始创建新项目(构建帮助)`的内容后，就可以自由修改本readme了，正式开始新的项目开发🤨。

<!-- 构建帮助 end -->

## 使用须知

本文档包括以下几个部分：

- 安装并运行
- 开发指南
- 上线指南（切记每次更新版本日志）
- 测试指南（测试人员须知）
- 目录规范（前端开发人员须知）
- 项目技术栈

👉开发前请阅读[项目规范：使用ES6开发小程序](./docs/使用ES6开发小程序.md)。

## 安装并运行

- 安装依赖并运行。
  ```bash
  npm install # 安装环境依赖
  npm run dev # 进入开发模式
  ```
- 打开微信开发者工具，导入项目，目录设置为本项目的根目录。
- 工具 > 构建npm。

> 注：若是在开发过程中，新安装了项目依赖的npm包，需要重新`npm run dev`，然后再`构建npm`。

## 开发指南

```bash
npm run lint-fix # fix代码格式
npm run generate:package # 将项目依赖包手动同步至src中，同步完成后才可以构建npm

# 新建页面(需要全局安装gulp)
gulp page --name about # 在src/pages/下新建一个about页面
gulp page --name about --path user # 自定义路径: 在src/pages/user/下新建一个about页面

# 新建组件(需要全局安装gulp)
gulp comp --name input # 在src/component/下新建一个input组件
gulp comp --name number-input --path input # 自定义路径: 在src/component/input/下新建一个number-input组件

# 如果没有全局安装gulp，也可以使用项目局部gulp
npm run gulp -- page --name about # 在src/pages/下新建一个about页面
npm run gulp -- page --name about --path user # 自定义路径: 在src/pages/user/下新建一个about页面
npm run gulp -- comp --name input # 在src/component/下新建一个input组件
npm run gulp -- comp --name number-input --path input # 自定义路径: 在src/component/input/下新建一个number-input组件
```

## 上线指南

- 更新[配置文件](src/config.js)的`version`版本号。
- 修改[配置文件](src/config.js)的`versionDesc`，完善当前版本的说明。

## 测试指南

- 可以使用体验版测试小程序。

## 目录规范

- [/src/api](/src/api/index.js) api集合，request封装。
- [/src/config](/src/config/index.js) 项目配置。
- [/src/templates](/src/templates/) 小程序模板，可以复用页面。
- [/src/components](/src/components/) 小程序自定义组件，适合抽离具有复用价值的组件。
- [/src/libs](/src/libs/) 引入的第三方库。
- [/src/utils](/src/utils/) 自己封装的工具方法。
- [/src/constant](/src/constant/) 可以放项目中需要的 常量、Map、枚举等。
- [/src/images](/src/images/) icon、图片。共享、可复用的图片等可以放在根目录；基本不会复用的建议根据功能分类新建二级目录存放图片。
- [/src/styles](/src/styles/) 抽离的样式。

## 项目技术栈

- [微信小程序: 官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/) 微信小程序。
- [@vant/weapp](https://youzan.github.io/vant-weapp/#/intro) 有赞UI组件库。
- [miniprogram-api-promise](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/api-promise.html) 扩展微信小程序api支持promise。
- [mobx-miniprogram](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/mobx.html) 小程序的 MobX 绑定辅助库，实现全局状态管理。
- [miniprogram-computed](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/computed.html) 小程序的computed实现，有限制。
- [prettier: Github](https://github.com/prettier/prettier) 代码美化工具。
