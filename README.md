# toutiao-82

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Run your tests
```
npm run test
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 这是我的第一个ＰＣ 端vue项目





## da4  添加的内容如下：
## 添加面包屑组件 黑马头条PC-面包屑组件封装

1. 面包屑组件 => 首页后的内容时活动的=> 定义了一个具名插槽(title)
   面包屑组件属于 路由级组件，放在 components 下的 conmon 文件里
   conponents 里自定义的组件，为了方便管理，都统一放在routers.js 中统一管理，所以将 面包屑组件注册在里面

## 黑马头条PC-评论列表-新建页面-挂载路由
2. 步骤-思路 新建一个评论列表页面,并挂载路由
   在views下 新建一个 评论列表 组件 comment
   挂载路由 => 挂载到home下的二级路由上  设置成按需加载

## 黑马头条PC-评论列表-页面结构-table的使用
3. 步骤-思路  页面头部 => 连续的两个具名插槽 => title => bread-crumb  =>header => el-card
   页面结构 => 表格 => elementUI => el-table组件  
   data属性  => 对象数组 
   el-table => el-table-column(列)=> prop属性(字段名),label(表头名称) 
