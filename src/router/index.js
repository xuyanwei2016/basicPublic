import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      meta: {
        title: ""
      },
      component: () => import('@/views/index/index')
    },{
      path: '/column',
      name: 'column',
      meta: {
        title: ""
      },
      component: () => import('@/views/column/index')
    },{
      path: '/list',
      name: 'list',
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
      },
      component: () => import('@/views/column/list')
    },{
      path: '/video',
      name: 'video',
      meta: {
        title: ""
      },
      component: () => import('@/views/column/video')
    },{
      path: '/pdf',
      name: 'pdf',
      meta: {
        title: ""
      },
      component: () => import('@/views/column/pdf')
    }]
})
