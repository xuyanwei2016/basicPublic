// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/nutui.js'
// import Vant from 'vant';
// import 'vant/lib/index.css';

// import "../static/css/index.scss"
// import 'font-awesome/scss/font-awesome.scss'
// import zh_CN from 'vee-validate/dist/locale/zh_CN';
// import VeeValidate, { Validator } from 'vee-validate';
import Cookies from 'js-cookie';
import ckplayer from "./plugins/ckplayer_v2/ckplayer/ckplayer.js"
// import { getConfigList } from "@/API.js"

// Vue.use(VeeValidate);

// Vue.use(Vant);
import * as filters from './filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// getConfigList().then(res => {
//     console.log(res);

// })


router.beforeEach((to, from, next) => { //to: Route:即将要进入的目标路由对象//from: Route:当前导航正要离开的路由//next: Function: 一定要调用该方法来resolve 这个钩子执行效果依赖 next 方法的调用参数。
    if(from.name=='video'||from.name=="pdf"){

        to.meta.isBack=true;
      }
    next()
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
