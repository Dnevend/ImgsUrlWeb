import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueClipboard from 'vue-clipboard2';
import  ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/http.js'
import Qs from 'qs'
import VueCookies from 'vue-cookies'

// axios.defaults.baseURL = 'http://81.68.146.67:8000/'
axios.defaults.baseURL = 'http://sstudent.club:8000/'
// axios.defaults.baseURL = 'http://localhost:44330/'
// Vue.prototype.$imgUrlRoot = 'http://81.68.146.67:8000/ImgsUrl/'
Vue.prototype.$imgUrlRoot = 'http://sstudent.club:8000/ImgsUrl/'

Vue.prototype.$axios = axios

Vue.prototype.$api = api

Vue.prototype.$qs = Qs

Vue.prototype.$cookies = VueCookies

Vue.config.productionTip = false

Vue.use(ElementUi);
Vue.use(VueClipboard);
Vue.use(VueCookies);

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){

    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()

    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      next({
        path: '/'
      })
    }

    //如果登录标志不存在，即未登录
  }else{

    next();

    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.isLogin){
      next({
        path: '/login',
      })
      //iViewUi友好提示
      ElementUi.Message.error({
        showClose: true,
        message:'Please Login First!'
      });
      //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }

  }

});

router.afterEach(route => {
  window.scroll(0, 0);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
