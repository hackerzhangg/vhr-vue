<template>
    <div>
        <!-- rules:定义登录规则 -->
        <!-- ref:相当于表单的名字 -->
        <el-form :rules="rules" ref="loginForms" :model="loginForm" class="loginContainer">
            <h3 class="LoginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <!--@keydown.enter.native:登录页面按下回车可以进入后台页面-->
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin()"></el-input>
            </el-form-item>
            <!-- checkbox浏览器是否记录密码 -->
            <el-checkbox v-model="checked" class="LoginRemember">记住密码</el-checkbox>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>

    //导入api.js或者在main.js中使用插件的方式并通过this调用api.js中的方法
    //import {postKeyValueRequest} from "../utils/api";

    export default {
        name: "Login",
        data(){
            return{
                //设置默认用户名和密码
                loginForm:{
                    username:'admin',
                    password:'123'
                },
                checked:true,
                // 定义登录规则
                rules:{
                    username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                    password:[{required:true,message:'请输入用户密码',trigger:'blur'}]
                }
            }
        },
        methods:{
            //登入系统
            submitLogin(){
                //alert("欢迎来到登录系统!");
                //校验用户名和密码是否输入，否者不能提交登录并给用户提示
                this.$refs.loginForms.validate((valid) => {
                    if (valid) {
                        //alert('submit!');
                        //postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                        //在main.js中使用配置插件的方式，可以直接通过this调用api.js中的方法    
                        this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                            if(resp){
                                //alert(JSON.stringify(resp));
                                //JSON.stringify(resp.obj):转成字符串格式,sessionStorage 属性允许在浏览器中存储 key/value 对的数据
                                //保存用户信息
                                window.sessionStorage.setItem("user",JSON.stringify(resp.object));
                                //如果当前页面path路径等于“/”或者undefined就去“/home”,否则去path页面
                                let path=this.$route.query.redirect;
                                //登录成功后，页面跳转home.vue
                                //this.$router.replace("/home");
                                //通过path判断直接去“/home页面，还是去path页面
                                this.$router.replace((path=='/' || path==undefined) ? '/home' : path);
                            }
                        })
                    } else {
                        this.$message.error("亲，请输入所有字段！");
                        //console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .LoginTitle{
        margin: 15px auto 20px auto;
        text-align: center;
    }
    .LoginRemember{
        text-align: left;
        margin: 0px 0px 13px 0px;
    }
</style>