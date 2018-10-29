<template>
    <div>
        <div style="height:60px;">
            <el-button type="primary" @click="change_show" class="film_operate">{{ del }}</el-button>
            <router-link to="/index/index_film_operate">
                <el-button type="primary" class="film_operate">操作</el-button>
            </router-link>
        </div>
        <el-badge v-for="its of film_info" value="X" class="item fime_size"  :hidden='is_show'>
            <div class="film_box">
                <img :src="its.pimage" alt="" @click="delete_fil(its.pid)" :class="delete_film">
                <p>{{ its.pname }}</p>
            </div>
        </el-badge>
    </div>
</template>

<script>
export default {
    data(){
        return {
            is_show:true,
            delete_film:'',
            del:'删除',
            film_info:[],
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        delete_fil(id){
            //删除电影
            var that=this;
            if(!this.is_show){
                this.$axios({
                    url:'http://111.230.128.231:8080/TTMS/managerPlay?method=delete',
                    method:'POST',
                    params:{pid:id}
                }).then(function(){
                    that.open2('删除成功')
                }).catch(function(){
                    that.open4('删除失败')
                })
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
        change_show(){
            this.is_show=!this.is_show;
            if(this.is_show){
                this.delete_film='';
                this.del='删除'
            }else{
                this.delete_film='delete';
                this.del='确定'
            }
        }
    },
    created(){
        //请求全部电影信息
        var that=this;
        this.$axios({
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/managerPlay?method=findAllPlay',
        }).then(function(response){
            that.film_info=response.data;
        }).catch(function(response){
            console.log('出错了')
        }) 
    }

}
</script>

<style>
.fime_size p{
    text-align: center
}
.film_cao{
    border:2px #F0F4F9 solid;
    border-radius: 5px;
}
.film_operate{
    float: right;
    margin-right: 70px;
}
.delete{
    cursor: pointer;
}
.film_box{
    height: 250px;
    width: 160px;
    margin-left: 30px;
}
.film_box img{
    width: 100%;
    height: 205px;
}
</style>
