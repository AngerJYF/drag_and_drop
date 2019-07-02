
![图片描述](https://github.com/AngerJYF/drag_and_drop/blob/master/src/assets/images/girl.gif)

### 一、项目分类
项目代码位于src目录下 `asset(静态资源)`、`common(公共资源、包括js、组件、样式)`、`router`、`store`、`views(视图)`

#### assets:
 存放静态资源, iconfont图标、图片等。

#### common
 存放公共资源
 js：公共的请求封装、与公共函数封装等。
 common:页面公共部分,例如侧边栏 头部等。
 style: 包括样式归一化的固定文件，和全局样式文件。

#### store
  vuex状态存储
  模块化分类, 对于新的module，新建文件，统一在入口文件引入。

#### view 视图
  按照页面进行模块化分类
  如：主页、广告管理系统、舆情系统等建立模块文件夹,各自的文件夹下包含当前模块的页面与组件等。


##### 注意事项：

1. 尽量避免写全局样式,可以在组件内部写的，写在组件内部(`scoped包一下`),全局样式统一写在index.css里，用父组件包一下，避免影响他人的样式。
  
 2.`common/js` 为包含全局请求封装与工具函数封装,`http.js`为`axios`的请求拦截等封装，`api.js`为接口入口，多人协作开发时，可建立多个接口入口文件(`homeApi.js、aboutApi.js`),但是项目所有接口必须位于此目录下，`http.js`修改时注意。

 3.`vuex` 以模块化分类,多人协作开发，根据自己的需求建立新的模块，入口`index.js`只作为引入,不允许添加逻辑。`mutations`的名称避免重复！
 
