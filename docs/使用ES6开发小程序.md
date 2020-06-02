# 使用ES6开发小程序

使用es6语法开发前端，可以提高开发效率，优化代码结构，统一代码风格。

1. 声明变量。

   > 注意：不要使用es5提供的var关键字。

   ```js
   // 声明一个常量，一般使用const即可满足需求
   const api = 'http://baidu.com'
   
   // 声明一个可变的变量，只有当const无法满足要求时才会使用let
   let flag = true
   if (this.data.isIPhone) {
     flag = false
   }
   ```

2. 模块方案使用es6提供的`import`、`export default`、`export`。

   > 注意：不要使用commonjs提供的module.exports和require语法。

   ```js
   /** 例子1 */
   
   // config.js
   export default {
     version: '1.0.0'
   }
   
   // page.js
   import config from '../config'
   console.log(config.version)
   ```

   ```js
   /** 例子2 */
   
   // config.js
   export const version = '1.0.0'
   
   // page.js
   import { version } from '../config'
   console.log(version)
   ```

   ```js
   /** 例子3 */
   
   // config.js
   export const version = '1.0.0'
   export default {
     projectName: 'weapp-quick-start'
   }
   
   // page.js
   import config, { version } from '../config'
   console.log(config.projectName, version)
   ```

3. 遍历数组。

   > 注意：不要使用for循环。

   ```js
   /** 给options中的每个项新增一个属性name */
   
   const options = [
     { value: 10 },
     { value: 20 },
     { value: 30 },
     { value: 40 },
     { value: 50 },
   ]
   
   options.forEach((item, index) => { // forEach
     item.name = `name${index}`
   })
   
   console.log(options) // 输出：[{ value: 10, name: 'name0' }, { value: 20, name: 'name1' }, ...]
   ```

   ```js
   /** 给options中的每个项新增一个属性name，生成一个新数组，不可以改变原数组options。 */
   
   const options = [
     { value: 10 },
     { value: 20 },
     { value: 30 },
     { value: 40 },
     { value: 50 },
   ]
   
   const newOptions = options.map((item, index) => { // map
     return {
       value: item.value,
       name: `name${index}`
     }
   })
   
   console.log(newOptions) // 输出：[{ value: 10, name: 'name0' }, { value: 20, name: 'name1' }, ...]
   console.log(options) // 输出：[{ value: 10 }, { value: 20 }, ...]
   ```

   ```js
   /** 从options中过滤出value为30的项 */
   
   const options = [
     { value: 10 },
     { value: 20 },
     { value: 30 },
     { value: 40 },
     { value: 50 },
   ]
   
   const result = options.filter(item => { // filter
     return item.value === 30
   })
   
   console.log(result) // 输出：[{ value: 30 }]
   ```

4. 箭头函数和this。

   > 除非迫不得已的情况，都使用箭头函数进行this绑定，不要使用that或self去暂存this。

   ```js
   // page.js
   import api from '../api/index.js'
   Page({
     data: {
       name: 'ellon'
     },
     entry() {
       const params = {
         id: 1
       }
       api.getName(params, () => { // 箭头函数
         console.log(this.data.name)
       })
       
       
       // 下面是错误示范。
       const that = this
       api.getName(params, function(){
         console.log(that.data.name)
       })
     },
     onLoad() {
       this.entry()
     }
   })
   ```

5. 使用对象和数组的解构。

   ```js
   // page.js
   import api from '../api/index.js'
   Page({
     data: {
       name: 'ellon',
       age: 12,
       address: '新华区',
       location: [30.889, 129.774],
     },
     entry() {
       const { name, age, address, location } = this.data // 使用对象解构
       const [latitude, longitude] = location // 使用数组解构
       const params = {
         age, // 同名可以省略。
         address,
         latitude,
         longitude,
         id: 1, // 不同名的正常写法，不可以省略。
         nickName: name, 
       }
       api.getName(params, (res) => {
         const { data } = res
         // 略...
       })
       
       // 下面是错误示范。
       const name = this.data.name
       const age = this.data.age
       const params2 = {
         id: 1,
         nickName: name,
         age: age,
         address: this.data.address,
         latitude: this.data.location[0],
         longitude: this.data.location[1]
       }
       // 略...
     },
     onLoad() {
       this.entry()
     }
   })
   ```

6. 字符串拼接。

   ```js
   const name = 'ellon'
   const age = 12
   
   console.log(`我是${name}，今年${age}岁。`) // 使用模板字符串。
   
   // 下面是错误示范。
   console.log('我是' + name '，今年' + age + '岁。')
   ```

7. 对象里面的方法可以简写。

   ```js
   // page.js
   Page({
     data: {
       name: 'ellon'
     },
     entry() { // 可以简写，省略function
       
     },
     onLoad() {
       this.entry()
     },
     
     // 下面是错误示范。
     getUserName: function() {
       
     },
     onShow: function() {
       
     }
   })
   ```

8. 使用rest扩展符。

   ```js
   // 张三丰的信息
   const zsf = {
     name: '张三丰',
     age: 14,
     address: '新华区'
   }
   
   // 张三丰的孪生兄弟，张五丰
   const zwf = {
     ...zsf,
     name: '张五丰'
   }
   
   console.log(zwf) // { name: '张五丰', age: 14, address: '新华区'}
   ```

### 结尾

想学习更多规范和开发技巧，请前往👉[前端项目规范](http://211.90.39.175:8187/front_group/vue-less-quick-start/blob/master/docs/前端项目规范.md)。