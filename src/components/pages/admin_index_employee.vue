<template>
  <div>
    <el-button type="primary"  @click="change_show">{{operate}}</el-button>
    <div style="margin: 15px 0px;float:right" v-if="is_show">
      <el-input style="width:430px" placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="choose" slot="prepend" placeholder="请选择">
          <el-option label="员工ID" value="1"></el-option>
          <el-option label="员工账号" value="2"></el-option>
        </el-select>
        <el-button slot="append" @click="select()" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    



    <el-table v-if="is_show" :data="employee_info" height="450" border style="width: 100%">
      <el-table-column prop="eid" label="员工ID" width="180"></el-table-column>
      <el-table-column prop="username" label="员工账号" width="180"></el-table-column>
      <el-table-column prop="email" label="电子邮件"></el-table-column>
      <el-table-column prop="telephone" label="电话"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, employee_info)"
          type="danger">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>



    <el-form v-if='!is_show' :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="员工账号" prop="username">
        <el-input v-model="ruleForm2.username" placeholder="必填"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" placeholder="必填" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" placeholder="必填" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" prop="email">
        <el-input type="email" v-model="ruleForm2.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="ruleForm2.telephone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm2.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
    methods:{
      change_show(){
        this.is_show=!this.is_show
        if(this.is_show){ this.operate='添加' }
        else{ this.operate='返回' }
      },
      deleteRow(index, rows) {
        var that=this;
        this.$axios({
          url:'http://111.230.128.231:8080/TTMS/managerEmployee?method=delete',
          method:'POST',
          params:{
            eid:rows[index].eid
          }
        }).then(function(res) {
          that.open2('删除成功')
          rows.splice(index, 1);
        }).catch(function(res){
          that.open4('出错了')
        })
      },
      submitForm(formName) {
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {    
              that.$axios({
                url:'http://111.230.128.231:8080/TTMS/managerEmployee?method=insert',
                method:'POST',
                params:{
                  password:that.ruleForm2.pass,
                  username:that.ruleForm2.username,
                  email:that.ruleForm2.email,
                  telephone:that.ruleForm2.telephone,
                  address:that.ruleForm2.address,
                }
              }).then(function(res) {
                that.open2('添加成功')
              }).catch(function(res){
                that.open4('出错了')
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      select(){
        if (this.input=='') {
          this.employee_info=this.tableData
        }else if(this.choose=='1'){
          this.employee_info=this.tableData.filter(tab => this.input==tab.eid)
        }else if(this.choose=='2'){
          this.employee_info=this.tableData.filter(tab => this.input==tab.username)
        }
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
    },
    data() {
        var checkEmail = (rule, value ,callback) =>{
          if(value){
            if(value.search(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)==-1){
              callback(new Error('请输入正确的Email'));
            }else{
              return callback();
            }
          }
          else{
           return callback();
          }
        }
        var checkTelephone = (rule, value ,callback) =>{
          if(value&&value.length!=11){
            return callback(new Error('电话位数不足'));
          }else if(value&&value.search(/^1\d{10}$/)==-1){
            return callback(new Error('请输入正确的手机号'));
          }else{
            return callback()
          }
        }
        var checkAddress = (rule, value ,callback) =>{
          return callback();
        }
        var checkUsername = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('账号不能为空'));
          }else{
            return callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
            is_show:true,
            operate:'添加',
            ruleForm2: {
              pass: '',
              checkPass: '',
              username:'',
              email:'',
              telephone:'',
              address: ''
            },
            rules2: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              username: [
                { validator: checkUsername, trigger: 'blur' }
              ],
              email: [
                { validator: checkEmail, trigger: 'blur' }
              ],
              telephone: [
                { validator: checkTelephone, trigger: 'blur' }
              ],
              address: [
                { validator: checkAddress, trigger: 'blur' }
              ],
            },
            input: '',
            choose: '',
            employee_info:[{
              eid: '2016-05-02',
              username: '王小虎',
              email: '上海',
              address: '上海市普陀区金沙江路 1518 弄',
              telephone: 200333
            }],
            tableData: [{
              eid: '2016-05-02',
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
        url:'http://111.230.128.231:8080/TTMS/managerEmployee?method=findAllEmployee',
        method:'GET'
      }).then(function(res){
        that.tableData=res.data
        that.employee_info=res.data
      }).catch(function(res){
        console.log(res)
        that.open4('出错了')
      })
    }
}
</script>

<style scoped>
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

