<template>
  <!--<div>基础信息设置</div>-->
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="部门管理" name="first">
      <DepMana></DepMana>
    </el-tab-pane>
    <el-tab-pane label="职位管理" name="second">
      <PosMana></PosMana>
    </el-tab-pane>
    <el-tab-pane label="职称管理" name="third">
      <JobLelveMana></JobLelveMana>
    </el-tab-pane>
    <el-tab-pane label="奖惩规则" name="fourth">
      <EcMana></EcMana>
    </el-tab-pane>
    <el-tab-pane label="权限组" name="fourth1">
      <PermissMana></PermissMana>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  //引入组件,需要在注册之后才可以显示
  import DepMana from '../../components/sys/basic/DepMana'
  import EcMana from '../../components/sys/basic/EcMana'
  import JobLelveMana from '../../components/sys/basic/JobLelveMana'
  import PermissMana from '../../components/sys/basic/PermissMana'
  import PosMana from '../../components/sys/basic/PosMana'
  export default {
    name: "SysBasic",
    data(){
        return{
          //activeName:值等于什么，页面中就显示什么基础信息
          activeName:'first'
        }
    },
    //注册组件，相当于自己自定义了一些html标签
    components:{
      //方式一
      'DepMana':DepMana,
      'EcMana':EcMana,
      'JobLelveMana':JobLelveMana,
      'PermissMana':PermissMana,
      'PosMana':PosMana

      //如果名称相同，可以使用简写的方式 例如：import DepMana from '../../components/sys/basic/DepMana'
      //方式二
      // DepMana,
      // EcMana,
      // JobLelveMana,
      // PermissMana,
      // PosMana
    }
  }
</script>

<style scoped>

</style>