<template>
    <el-container direction="vertical">
        <el-head class="index_head"></el-head>
        <el-container>
            <el-aside width='65px' class="index_left">
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                    <router-link to="/index/index_film">
                        <el-menu-item index="1">
                            <i class="icon iconfont icon-ai239"></i>
                            <span slot="title">影片管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/index/index_play_hall">
                        <el-menu-item index="2">
                            <i class="el-icon-document"></i>
                            <span slot="title">演出厅管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/index/index_play_plan">
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>
                            <span slot="title">演出计划</span>
                        </el-menu-item>
                    </router-link >
                    <router-link to="/index/index_employee">
                        <el-menu-item index="4">
                            <i class="icon iconfont icon-yuangong"></i>
                            <span slot="title">员工管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/index/index_user">
                        <el-menu-item index="5">
                            <i class="icon iconfont icon-vip"></i>
                            <span slot="title">会员管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/index/index_film">
                        <el-menu-item index="6">
                            <i class="icon iconfont icon-xiaoshoutongji"></i>
                            <span slot="title">销售分析</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </el-aside>
            <el-main class="index_right">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import server_header from '.././common/header'
export default {
    name:'index',
    data(){
        return {
            isCollapse: true
        }
    },
    components:{
        'el-head':server_header
    }
}
</script>

<style scoped>
.iconfont{
    font-size:24px;
}
.index_left{
    height: 100%;
    position: fixed;
    border-right: 1px #E8E7E4 solid ;
    top:101px;
}
.index_right{
    margin-left: 80px;
    margin-top:101px;
}
.index_head{
    position: fixed;
    width: 100%;
    z-index: 999;
}
</style>

