# weapp-quick-start

## 使用

- ```bash
  npm install
  ```

- 将微信小程序的项目目录设置为根目录。

## cli

- 新建页面

  ```bash
  gulp page --name about # 在src/pages/下新建一个about页面
  gulp page --name about --path user # 自定义路径: 在src/pages/user/下新建一个about页面
  ```

- 新建组件

  ```bash
  gulp comp --name input # 在src/component/下新建一个input组件
  gulp comp --name number-input --path input # 自定义路径: 在src/component/input/下新建一个number-input组件
  ```

## 上传流程

- 更新[配置文件](src/config.js)的`version`版本号。
- 修改[配置文件](src/config.js)的`isProd`，`true`表示生产环境。
- 修改[配置文件](src/config.js)的`versionDesc`，完善当前版本的说明。
- `yarn u` 或者 `npm run u` 上传代码。
> `yarn u` 会自动以[配置文件](src/config.js)中的`versionDesc`为描述，并附加环境信息。
