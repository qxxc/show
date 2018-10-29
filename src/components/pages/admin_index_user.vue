<template>
    <div>
        <div style="margin: 15px 0px;float:right">
            <el-input style="width:430px" placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-select v-model="choose" slot="prepend" placeholder="请选择">
                <el-option label="用户ID" value="1"></el-option>
                <el-option label="用户账号" value="2"></el-option>
                </el-select>
                <el-button slot="append" @click="select()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table :data="employee_info" height="450" border style="width: 100%">
            <el-table-column prop="uid" label="用户ID" width="180"></el-table-column>
            <el-table-column prop="username" label="用户账号" width="180"></el-table-column>
            <el-table-column prop="email" label="电子邮件"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, employee_info)"
                    type="danger">
                    删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input: '',
            choose: '',
            employee_info:[{
              uid: '2016-05-02',
              username: '王小虎',
              email: '上海',
              address: '上海市普陀区金沙江路 1518 弄',
              telephone: 200333
            }],
            tableData: [{
              uid: '2016-05-02',
              username: '王小虎',
              email: '上海',
              address: '上海市普陀区金沙江路 1518 弄',
              telephone: 200333
            }]
        }
    },
    created(){
      var that=this;
      this.$axios({
        url:'http://111.230.128.231:8080/TTMS/managerUser?method=findAllUser',
        method:'GET'
      }).then(function(res){
        that.tableData=res.data
        that.employee_info=res.data
      }).catch(function(res){
        console.log(res)
        that.open4('出错了')
      })
    },
    methods:{
        deleteRow(index, rows) {
            var that=this;
            this.$axios({
            url:'http://111.230.128.231:8080/TTMS/managerUser?method=delete',
            method:'POST',
            params:{
                uid:rows[index].uid
            }
            }).then(function(res) {
            that.open2('删除成功')
            rows.splice(index, 1);
            }).catch(function(res){
            that.open4('出错了')
            })
        },
        open2(msg) {
            this.$message({
            message: msg,
            type: 'success'
            });
        },
        open4(msg) {
            this.$message.error(msg);
        },
        select(){
        if (this.input=='') {
          this.employee_info=this.tableData
        }else if(this.choose=='1'){
          this.employee_info=this.tableData.filter(tab => this.input==tab.uid)
        }else if(this.choose=='2'){
          this.employee_info=this.tableData.filter(tab => this.input==tab.username)
        }
      },
    }
}
</script>

<style>
  .el-select {
    width: 130px;
  }
  .input-with-select{
    background-color: #fff;
  }
  .el-input-group__prepend {
    background-color: #fff;
  }
</style>
