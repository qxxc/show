<template>
    <div class="layout">
        <div class="layout-ceiling">
            <div style="float:left;color:#9ea7b4">
                <p style="float:left;margin:0px 10px 0px 20px">纸飞机影院</p>
                <i class="iconfont icon-paper-airplane" style="font-size:20px"></i>
            </div>
            <div v-if="!this.$store.state.status" class="layout-ceiling-main">
                <router-link to="/user">登陆</router-link>
                <router-link to="/register">注册</router-link>
            </div>
            <div v-if="this.$store.state.status" class="layout-ceiling-main">
                <span style="color: #9ba7b5;">你好,
                   <!-- <el-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <el-button>Top center</el-button>
</el-tooltip> -->
                    <el-tooltip placement="top">
                        <el-button>{{this.$store.state.username}}</el-button>
                        <div slot="content">
                            <p style="font-size:14px;margin:10px 0px;">
                                <span @click="touserinfo()" style="color: #9ba7b5;cursor: pointer;font-size:18px">你的信息</span>
                                <br/>
                                <span @click="change_status()" style="color: #9ba7b5;cursor: pointer;font-size:18px">注销</span>
                                </p>
                        </div>
                    </el-tooltip>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        touserinfo(){
            this.$router.push({path:'/userinfo',query:{}})
        },
        change_status(){
            this.$store.state.status=false;
            this.$store.state.username='';
            this.$store.state.password='';
            this.$store.state.email='';
            this.$store.state.telephone='';
            this.$store.state.address='';
            this.$store.state.uid='';
            this.$router.push({path:'/',query:{}})
        }
    }
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-ceiling{
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
    font-size: 20px
}
.layout-ceiling-main{
    float: right;
    margin-right: 15px;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
</style>
