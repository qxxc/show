<template>
<div>
    <el-head class="index_head"></el-head>
    <div class="box">
        <h1>{{this.$store.state.username}}</h1>
        <p class="user_info">
            <span>{{this.$store.state.email}}</span>
            <span>{{this.$store.state.telephone}}</span>
            <span style="border:none">{{this.$store.state.address}}</span>
            <Icon type="compose" style="cursor: pointer;float:right" @click="change()"></Icon>
        </p>
        <p class="fenge"></p>
        <div v-if="is_show" class="bill" v-for="item of info">
            <h4>{{item.pname}}({{item.stuname}})</h4>
            <p>
                <span>{{item.cname}}</span>
                <span>{{item.schetime}}({{item.language}})</span>
            </p>
            <p>
                <span>{{item.seatRow}}排{{item.seatCol}}列</span>
                <span>{{item.ticketprice}}元</span>
                <i-button type="error" style="float:right" @click="return_ticket(item.ticketid)">退票</i-button>
            </p>
        </div>
        <div v-if="!is_show" style="text-align:center;margin:50px 0px">
            <form class="form-insert" enctype="multipart/form-data">
                <p style="margin:20px 0px"><span>账号</span><input type="text" v-model="form.username" placeholder="请输入新账号"></p>
                <p style="margin:20px 0px"><span>旧密码</span><input type="password" v-model="form.password" placeholder="请输入旧密码"></p>
                <p style="margin:20px 0px"><span>新密码</span><input type="password" v-model="form.new_password" placeholder="请输入新密码"></p>
                <p style="margin:20px 0px"><span>Email</span><input type="text" v-model="form.email" placeholder="请输入新Email"></p>
                <p style="margin:20px 0px"><span>电话</span><input type="text" v-model="form.telephone" placeholder="请输入新电话"></p>
                <p style="margin:20px 0px"><span>地址</span><input type="text" v-model="form.address" placeholder="请输入新地址"></p>
                <input type="button" class="submit" @click="sumbit" value="提交">
            </form>
        </div>
    </div>
</div>
</template>

<script>
import store from "@/vuex/store";
import server_header from '.././common/head'
export default {
    store,
    data(){
        return{
            is_show:true,
            form:{
                username:'',
                password:'',
                email:'',
                telephone:'',
                address:'',
                new_password:''
            },
            info:[]
        }
    },
        components:{
        'el-head':server_header
    },
    created(){
        var that=this;
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/order?method=findInfoBySaleid',
            method:'GET',
            params:{
                uid:that.$store.state.uid
            }
        }).then(res=>{
            that.info=res.data;
        }).catch(res=>{
            console.log(res.data)
        })
    },
    methods:{
        change(){
            this.is_show=!this.is_show
        },
        return_ticket(id){
        //退票
            var that=this;
            this.$axios({
                url:'http://111.230.128.231:8080/TTMS/selectSeatTicket?method=delTicket',
                method:'POST',
                params:{
                    ticketid:id,
                }
            }).then(res=>{
                that.$Message.success('申请成功');
            }).catch(res=>{
                console.log(res.data)
            })
        },
        sumbit(){
            this.$axios({
                url:'',
                method:'POST',
                params:{
                    uid:that.uid,
                }
            }).then(res=>{
                that.$Message.success('修改成功');
            }).catch(res=>{
                console.log(res.data)
            })
        }
    }
}
</script>

<style scoped>
.box{
    width: 1000px;
    border: 1px #c3cbd6 solid;
    border-radius: 5px;
    margin: 0px auto;
    padding: 20px;
    color:#464c5b;
    font-size: 20px
}
.user_info{
    color: #657180;
}
.user_info span{
    display: inline-block;
    border-right: 1px #c3cbd6 solid;
    padding: 0px 12px
}
.fenge{
    height: 1px;
    margin: 20px -20px;
    background-color: #c3cbd6
}
.bill{
    background-color:white;
    border: 1px #c3cbd6 solid;
    color: black;
    padding: 12px 24px;
    margin-top:10px
}
.bill span{
    font-size: 16px
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
      font-size: 14px;
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
      cursor: pointer;

  }
</style>

