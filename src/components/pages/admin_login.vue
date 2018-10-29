<template>
    <div>
        <el-container>
            <el-header style="height:101px;background-color:#EFF4FA;border-bottom:1px #A0B1C4 solid;">
                <img class="header_img" src="../../../static/1528030268_782290.png" style="height:80%" alt="">
                <i class="icon iconfont icon-paper-airplane"></i>
            </el-header>
            <el-container >
                 <el-aside width="60%" class="a">
                    <div class="dec_box">
                        <div class="dec_img">
                            <img src="../../../static/timg.jpg" style="width:300px" alt="">
                        </div>
                        <div class="des_text">
                            <p>较高级复杂的劳动</p>
                            <p>是这样一种劳动力的表现</p>
                            <p>它需要较高的教育费用</p>
                            <p>它的生产需要花费较多的劳动时间</p>
                            <p>因此，具有较高的价值</p>
                            <p>--来自创造者</p>
                        </div>
                    </div>
                 </el-aside>
                <el-main>
                    <div>
                        <div class="login_main">
                            <el-form label-position="top" label-width="80px">
                                <el-form-item label="用户名">
                                    <el-input v-model="user.username"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input type="password" v-model="user.password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <!-- <router-link to='/index/index_film'> -->
                                        <el-button type="primary" @click="sumbit()">登陆</el-button>
                                    <!-- </router-link> -->
                                </el-form-item>

                            </el-form>
                        </div>
                    </div>
                </el-main>
            </el-container>
            <el-footer style="background-color: rgb(239, 244, 250);">
                <div class="footer">
                    <p>The paper plane theater sincerely serves you</p>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import server_header from '.././common/header'
import store from "@/vuex/store";
export default {
    name:'login',
    store,
    data(){
        return{
            user:{
                username:'',
                password:''
            }
        }
    },
    components:{
        'el-head':server_header
    },
    methods:{
        sumbit(){
            var that=this;
            this.$axios({
                method:'POST',
                url:'http://111.230.128.231:8080/TTMS/employeeLogin',
                params:that.user
            })
            .then(function(response){
                if(response.data.eid){
                    that.$store.state.username=response.data.username;
                    that.$router.push('/index/index_film')
                }else if(response.data==0){
                    that.open4('密码错误')
                }
                console.log(response);
            }).catch(function(res){
                that.open4('出错了')
            })
        },
        open4(msg) {
            this.$message.error(msg);
        },
    }
}
</script>

<style scoped>
i{
    float: left;
}
.header_img{
    float: left;
}
.iconfont{
    font-size: 66px;
    color: #109EFF
}
.login_main{
    width: 300px;
    margin-top: 30px;
    border: 1px #A0B1C4 solid;
    padding:20px;
    border-radius: 5px
}
.des_text{
    float: right;
    line-height: 30px;
}
.dec_img img{
    float: left;
}
.dec_box{
    width: 600px;
    margin: 20px;
    margin-left: 100px;
}
.footer{
    color: #868686;
    position: relative;
    height: 100%;
}
.footer p{
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%)
}
</style>
