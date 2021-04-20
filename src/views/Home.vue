<template>
    <div>
        <!-- Welcome Come to Vue -->
        <el-container>
            <el-header class="homeHeader">
                <div class="title">微人事</div>
                <div>
                    <el-dropdown class="userInfo" @command="commandHandler">
                        <span class="el-dropdown-link">
                            <!-- user.name：获取用户名 -->
                            {{user.name}}
                            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                            <i>
                                <!-- 用户头像 -->
                                <img :src="user.userface" alt="">
                            </i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>                    
                            <!-- disabled：禁用 -->
                            <!-- <el-dropdown-item disabled>XXXX</el-dropdown-item> -->
                            <!-- divided:具有分隔线 -->
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">

                    <!-- 使用for循环显示左边栏方式一 -->
                    <!-- 
                        使用一种简写方式
                        <el-menu @select="menuClick">
                        =<el-menu router>
                        这种情况下则不需要使用menuClick(index,indexPath){}方法
                     -->
                    <!-- 
                        vue里面不推荐v-for和v-if同时使用，代码会提示警告
                        如果使用for循环需要加上:key="index"
                    -->                   
                    <!-- 
                        router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
                    -->
                    <!-- <el-menu @select="menuClick"> -->
                    <!-- <el-menu router>    
                        <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index" >
                            <template>
                                <template slot="title" >
                                    <i class="el-icon-location"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                            </template>
                        </el-submenu>                       
                    </el-menu> -->

                    <!-- 使用for循环显示左边栏方式二，优化v-for和v-if同时使用警告的问题 -->
                    <el-menu router unique-opened>
                      <!--<template v-for="(item,index) in this.$router.options.routes">-->
                      <template v-for="(item,index) in routes">
                            <!--<el-submenu index="1" v-if="!item.hidden" :key="index">-->
                            <el-submenu :index="index+''" v-if="!item.hidden" :key="index">
                                <template slot="title" >
                                    <!--<i class="el-icon-location"></i>-->
                                    <!--设置导航栏图标信息-->
                                    <i style="color: #409eff;margin-right: 5px" :class="item.iconCls"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                            </el-submenu>  
                        </template>                     
                    </el-menu>

                    <!-- <el-menu @select="menuClick">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航栏一</span>
                            </template>
                                <el-menu-item index="/test1">选项1</el-menu-item>
                                <el-menu-item index="/test2">选项2</el-menu-item>
                        </el-submenu>                       
                    </el-menu> -->
                </el-aside>
                <el-main>
                    <!--判断是否在首页，不在首页的话显示-->
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path !='/home'">
                      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                      <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path =='/home'">
                      欢迎来到微人事!
                    </div>
                    <router-view class="homeRouterHome"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name:"Home",
        data(){
            return{
                //获取数据:parse转换成对象
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed:{
          routes(){

            return this.$store.state.routes;
          }
        },
        methods: {
            //当使用<el-menu router>就不需要menuClick
            menuClick(index,indexPath){
                //console.log("index:"+index);
                //console.log("indexPath:"+indexPath);
                this.$router.push(index);
            },
            commandHandler(cmd){
                if(cmd == 'logout'){
                    // this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    //     }).then(() => {
                    //         //确定注销登录
                    //         this.getRequest("/logout");
                    //     }).catch(() => {
                    //     this.$message({
                    //         type: 'info',
                    //         message: '已取消操作'
                    //     });          
                    // });
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //退出登录
                        this.getRequest("/logout");
                        //清除销毁user信息
                        window.sessionStorage.removeItem("user");
                        //初始化，用于不同权限的角色显示不同的左菜单
                        this.$store.commit('initRoutes', []);
                        //重新跳转到登录页面
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        },
    }
</script>

<style scoped>
    .homeRouterHome{
      margin-top: 10px;
    }

    .homeWelcome{
        text-align: center;
        font-size: 30px;
        font-family: cursive;
        color: #409eff;
        padding-top: 50px;
    }

    .homeHeader{
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: cursive;
        color: #ffffff;
    }

    .homeHeader .userInfo{
        cursor: pointer;
    }

    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
</style>