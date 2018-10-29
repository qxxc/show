<template>
    <el-header style="height:101px;background-color:#EFF4FA;border-bottom:1px #A0B1C4 solid;">
        <img class="header_img" src="../../../static/1528030268_782290.png" style="height:80%" alt="">
        <i class="icon iconfont icon-paper-airplane"></i>
        <div class="user">
            <el-popover
            placement="top"
            width="150"
            trigger="hover">
                <!-- <el-button size="mini" type="text" @click="visible2 = false">取消</el-button> -->
                <p class="userp" @click="recome">注销</p>
                <el-button round slot="reference"><span>你好，</span><span>{{$store.state.username}}</span></el-button>
            </el-popover>
        </div>
    </el-header>
</template>

<script>
import store from '@/vuex/store'
export default {
    store,
    data(){
        return{}
    },
    methods:{
        recome(){
            this.$router.push('/')
            this.$store.state.username=''
        }
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
.user{
    position: absolute;
    right: 20px;
    top:10px;
}
.userp{
    text-align: center;
    letter-spacing:4px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
}
.userp:hover{
    background-color: #EEF6FF;
    color: #409FFF;
}
</style>

