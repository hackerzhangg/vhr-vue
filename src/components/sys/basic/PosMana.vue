<template>
  <div>
    <div>
      <el-input
          size="small"
          class="iddPosInput"
          placeholder="添加职位"
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
      </el-input>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition()">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table
          :data="positions"
          border
          stripe
          style="width: 70%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间">
        </el-table-column>
        <!--scope.$index：当前操作第几行，scope.row：当前行对应的json-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 职位修改对话框 -->
    <el-dialog
        title="修改职位"
        :visible.sync="dialogVisible"
        width="30%">
        <!--<span>这是一段信息</span>-->
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="updatePosInput" size="small"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "PosMana",
    data(){
      return{
        pos:{
          name:''
        },
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }]
        //dialogVisible:等于false不显示对话框，true显示对话框
        dialogVisible:false,
        positions:[

        ]
      }
    },
    //mounted: 生命周期，使用初始化方法，自动执行，不要要手动点击此方法
    mounted() {
      this.initPositions();
    },
    methods:{
      //添加职位
      addPosition(){
        //判断文本框中的值是否为空
        if(this.pos.name){
          this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
            if (resp){
              //添加成功后，调用查询全部职位数据
              this.initPositions();
              //添加完成后，清空输入框
              this.pos.name='';
            }
          })
        }else {
          this.$message.error("职位名称不可以为空!");
        }
      },
      //删除职位
      handleDelete(index,data){
        this.$confirm('此操作将永久删除【'+data.name+'】职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
            if (resp){
              this.initPositions();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //更新职位
      showEditView(index,date){
        //显示对话框
        this.dialogVisible=true;
      },
      //查询所有职位
      initPositions(){
        //调用后端PositionController接口，查询所用职位信息，使用get请求响应
        this.getRequest("/system/basic/pos/").then(resp=>{
          //判断resp是否为空，如果不为空，将resp值赋值给positions在页面中显示
          if (resp){
            this.positions=resp;
          }
        })
      }
    }
  }
</script>

<style>
  .iddPosInput{
    width: 350px;
    margin-right: 8px
  }
  .posManaMain{
    margin-top: 10px;
  }
  .updatePosInput{
    width: 200px;
    margin-left: 8px;
  }
</style>