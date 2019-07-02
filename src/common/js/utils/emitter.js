import { promises } from "fs";

/*
 * @Author: fengchaoran 
 * @Date: 2018-12-21 15:27:45 
 * @Last Modified by: 冯超然
 * @Last Modified time: 2019-03-13 11:05:31
 * 
 * 实现dispatch(向上触发事件)/broadcast(向下广播事件)
 * 只需要提供向上或向下的组件name,就可以触发事件
 * mixins进组件或App.vue(需要provide{return app:this},子组件inject接受app实例)
 * 调用 this.broadcast('组件名称', '事件名称', '内容 or Object');
 */
export default {
  methods: {
    dispatch(componentName, eventName, params) {//向上
      dispatch.call(this, componentName, eventName, params)
    },
    broadcast(componentName, eventName, params) {//向下传递
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
//向下广播事件
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
//向上传递
function dispatch(componentName, eventName, params) {
  let parent = this.$parent || this.$root;
  let name = parent.$options.name;

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.name;
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params));
  }
}
/**
 * 原理: 递归遍历来匹配组件的 name ,匹配到则在组件上注册$emit事件
 * 然后开发过程中，在指定的组件上注册$on事件监听
 */
let p1 = new Promise((resolve,reject)=>{
  resolve(1)
})

let p2 = new Promise((resolve,reject)=>{
  reject('错误rejec')
})

p1.then(res=>{
  return res
}).then(res=>{
}).catch(res=>{
})