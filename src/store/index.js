//导入Vue对象
import Vue from 'vue'
import Vuex from 'vuex'

//使用VueX
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations:{
        initRoutes(state,data){
            state.routes=data;
        }
    },
    actions:{
        
    }
})

