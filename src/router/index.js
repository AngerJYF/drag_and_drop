import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Layout'
      }
    },
    {
      path: '/DragDrop',
      name: 'DragDrop',
      component: () => import(/* webpackChunkName: "DragDrop" */ '@/views/DragDrop'),
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    }
  ]
})
