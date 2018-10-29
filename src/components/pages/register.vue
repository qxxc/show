<template>
<div>
    <el-head class="index_head"></el-head>
    <div style="text-align:center;margin:50px 0px">
        <form class="form-insert" enctype="multipart/form-data">
            <p style="margin:20px 0px"><span>账号</span><input type="text" v-model="form.username" placeholder="请输入账号"></p>
            <p style="margin:20px 0px"><span>密码</span><input type="password" v-model="form.password" placeholder="请输入密码"></p>
            <p style="margin:20px 0px"><span>Email</span><input type="text" v-model="form.email" placeholder="请输入Email"></p>
            <p style="margin:20px 0px"><span>电话</span><input type="text" v-model="form.telephone" placeholder="请输入电话"></p>
            <p style="margin:20px 0px"><span>地址</span><input type="text" v-model="form.address" placeholder="请输入地址"></p>
            <input type="button" class="submit" @click="sumbit" value="提交">
        </form>
    </div>
</div>
</template>
<script>
import server_header from '.././common/head'
    export default {
        data () {
            return {
                form: {
                    username:'',
                    password:'',
                    email:'',
                    telephone:'',
                    address:''
                }
            }
        },    
        components:{
            'el-head':server_header
        },
        methods:{
            sumbit(){
                var that=this;
                if(this.form.username!=''&&this.form.password!=''){
                    this.$axios({
                        url:'http://111.230.128.231:8080/TTMS/login?method=regist',
                        method:'POST',
                        params:that.form
                    }).then(res=>{
                        that.$Message.success('提交成功');
                    }).catch(res=>{
                        that.$Message.error('出错了');
                    })
                }else{
                    that.$Message.error('请填写账号名和密码');
                }
            }
        }
    }
</script>
<style scoped>
.box{
    width: 300px;
    margin: 0 auto
}
.form-insert span{
      color: #5F6260;
      margin: 10px;
      font-size: 14px
      }
  .form-insert input{
      display: inline-block;
      height: 40px;
      width: 202px;
      padding: 0 15px;
      border:1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      line-height: 40px;
      box-sizing:border-box;
  }
  .form-insert p{
      margin: 10px 0;
  }
  .form-insert input[class*='submit']{
      margin: 10px;
      color: #fff;
      background-color: #409EFF;
      border:1px solid #dcdfe6;
      border-color: #409EFF;
      font-size: 14px;
      text-align: center;
      border-radius: 4px
  }
  .form-insert input[class*='submit']:hover{
      background-color: #35B3FF;
      cursor: pointer
  }
</style>
