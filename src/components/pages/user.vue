<template>
    <div style="text-align:center">
    <el-head class="index_head"></el-head>

        <form class="form-insert" enctype="multipart/form-data">
            <p style="margin:20px 0px"><span>账号</span><input type="text" v-model="username" placeholder="请输入账号"></p>
            <p style="margin:20px 0px"><span>密码</span><input type="password" v-model="password" placeholder="请输入密码"></p>
            <input type="button" class="submit" @click="sumbit" value="登陆">
        </form>
    </div>
</template>

<script>
import store from '@/vuex/store'
import server_header from '.././common/head'
export default {
    store,
    data(){
        return{
            username:'',
            password:'',
            from_path:'',
            from_query:''
        }
    },
    components:{
        'el-head':server_header
    },
    methods:{
        sumbit(){
            var that=this;
            if(this.username!=''&&this.password!=''){
                this.$axios({
                    url:'http://111.230.128.231:8080/TTMS/login?method=login',
                    method:'POST',
                    params:{
                        username:that.username,
                        password:that.password
                    },
                    headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                    },
                }).then(res=>{
                    if(res.data.uid){
                        that.$store.state.status=true;
                        that.$store.state.username=res.data.username;
                        that.$store.state.password=res.data.password;
                        that.$store.state.email=res.data.email;
                        that.$store.state.telephone=res.data.telephone;
                        that.$store.state.address=res.data.address;
                        that.$store.state.uid=res.data.uid;
                        that.$router.push({path:'/',query:{}})
                    }else{
                        that.$Message.error('密码错误');
                    }
                }).catch(res=>{
                    that.$Message.error('出错了');
                })
            }else{
                this.$Message.error('请输入账号和密码')
            }
        }
    },
    beforeRouteEnter (to, from, next) {
         // 在渲染该组件的对应路由被 confirm 前调用
         // 不！能！获取组件实例 `this`
         // 因为当钩子执行前，组件实例还没被创建
         console.log(from.path)
         console.log(from)
         console.log(from.query)
        // this.from_path=from.path
        // this.from_query=from.query      
         next(vm=>{
             vm.from_path=from.path
             vm.from_query=from.query  
         });
    },
}
</script>

<style scoped>
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

