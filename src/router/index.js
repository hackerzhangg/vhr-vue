import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home1.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

//导入测试页面
import Test1 from '../views/Test1.vue'
import Test2 from '../views/Test2.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Login',
    component: Login,
    //隐藏
    hidden:true
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    //隐藏
    hidden:true
  },{
    path: '/home',
    //name: 'Home',
    name: '导航栏一',
    component: Home,
    //hidden:true,
    //children：在右边窗口显示
    children:[
      {
        path: '/test1',
        //name: 'Test1',
        name: '选项1',
        component: Test1,
        // hidden:false,
      },{
        path: '/test2',
        //name: 'Test2',
        name: '选项2',
        component: Test2,
        // hidden:false,
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // 动态引入
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
