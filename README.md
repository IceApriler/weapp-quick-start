# weapp-quick-start

<!-- 构建帮助 start -->

该项目为`小程序项目开发模板`，目录和通用工具已经构建好，可以快速启动前端开发。
本项目长期更新，使用`方式二`创建项目时记得先拉取最新代码。

## 开始创建新项目

### 一、创建仓库

在[`Gitlab`](http://211.90.39.175:8187/)创建一个新的项目，假设新项目名为`my-project`, 获取到项目的地址为`http://my-project.git`。

### 二、使用模板

#### 方式一
```bash
git clone http://211.90.39.175:8187/front_group/weapp-quick-start.git my-project --depth=1 # 克隆至本地并重命名为my-project
cd my-project # 进入项目
git remote set-url origin http://my-project.git # 将my-project文件夹的远程地址修改为对应的新项目地址
git remote -v # 检查一下远程仓库是否正确
```

#### 方式二
```bash
git clone http://211.90.39.175:8187/front_group/weapp-quick-start.git # 克隆weapp-quick-start至本地
git clone http://my-project.git # 克隆新项目至本地
```
将`weapp-quick-start`中的所有文件（**.git除外**），复制到新项目`my-project`中，然后将提交代码至远程仓库。

> 项目创建好后，照下面👇步骤进行配置。

### 三、配置项目


<!-- 构建帮助 end -->

## 使用须知

本文档包括以下几个部分：

- 安装并运行
- 开发指南
- 上线指南（切记每次更新版本日志）
- 测试指南（测试人员须知）
- 目录规范（前端开发人员须知）
- 项目技术栈

## 安装并运行

```bash
npm install # 安装环境依赖
npm run dev # 进入开发模式
```

将微信小程序的项目目录设置为根目录。

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
- 修改[配置文件](src/config.js)的`isProd`，`true`表示生产环境。
- 修改[配置文件](src/config.js)的`versionDesc`，完善当前版本的说明。

## 测试指南

- 使用体验版测试。
