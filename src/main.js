import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入Elenent-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//使用Vue插件
import {postRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import * as constants from "constants";

import {initMenu} from "./utils/menus";
//页面中引用font-awesome图标库
import 'font-awesome/css/font-awesome.min.css'
import el from "element-ui/src/locale/lang/el";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

Vue.config.productionTip = false
//使用Elenent-UI
Vue.use(ElementUI);

//全局导航守卫
//to:即将要进入的目标 路由对象
//from:当前导航正要离开的路由
//next:一定要调用该方法来resolve这个钩子
router.beforeEach((to,from,next)=>{
    // console.log(to);
    // console.log(from);
    // next();

  // if(to.path=='/'){
  //     next();
  // }else{
  //   initMenu(router,store);
  //   next();
  // }

  if(to.path=="/"){
    next();
  }else{
    //判断用户是否登录，如果没有登录，直接到登录页面
    if (window.sessionStorage.getItem("user")){
      initMenu(router,store);
      next();
    }else{
      //next("/");
      //重定向带参数
      next('/?redirect='+to.path);
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
