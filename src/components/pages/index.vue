<template>
    <div >
        <el-head class="index_head"></el-head>
        <Carousel dots='inside' trigger='click' arrow='hover' autoplay :autoplay-speed="speed">
            <Carousel-item v-for="item in lunbo">
                <div class="demo-carousel"><img :src="item" 
                style="display:inline-block;heigth:100%"></div>
            </Carousel-item>
        </Carousel>
        <div class="kuang">
            <div style="height:48px">
                <p class="kuang_header"></p>
                <h1 style="display:inline-block">正在热映</h1>
                <span class="header_text" @click="show_films()">全部</span>
                <span v-for="it of classif" class="header_text" @click="show_films(it.cname)">{{it.cname}}</span>
            </div>
            <div style="overflow:auto">
                <Card v-for="item of show_film" style="margin:10px 15px;width:200px;float:left">
                    <div style="overflow:auto">
                        <img :src="item.pimage" @click="xiangqing(item.pid)" style="width:160px;height:200px;cursor: pointer;">
                        <div class="card">
                            <h3><span class="film_name" @click="xiangqing(item.pid)">{{item.pname}}</span></h3>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import server_header from '.././common/head'
export default {
    data(){
        return {
            speed:2000,
            classif:[],
            lunbo:['http://img5.mtime.cn/mg/2018/05/11/094030.45344019.jpg',
                    'http://img5.mtime.cn/mg/2018/05/25/092259.16788626.jpg'],
            film_info:[
            ],
            show_film:[]
        }
    }, 
    components:{
        'el-head':server_header
    },
    methods:{
        xiangqing(id){
            this.$router.push({path:'/film_desc',query:{pid:id}});
        },
        show_films(typename){
        console.log(typename)
        console.log(this.film_info[0].cname)
            if(typename){
            this.show_film=this.film_info.filter(tab => tab.cname==typename)
            }else{
                this.show_film=this.film_info
            }
        }
    },
    created(){
        var that=this;
        this.$axios({
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/play?method=index',
        }).then(function(response){
            that.film_info=response.data;
            that.show_film=response.data;
        }).catch(function(response){
            console.log('出错了')
        }) 
        this.$axios({
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/play?method=findPlayByType',
        }).then(function(response){
            that.classif=response.data;
        }).catch(function(response){
            console.log('出错了')
        }) 
    }
}
</script>
<style>
.kuang{
    width: 1100px;
    margin:20px auto;
}
.kuang_header{
    float: left;
    width: 5px;
    height: 100%;
    background-color: #FF6000;
    margin-right: 10px
}
.header_text{
    display: inline-block;
    margin-left: 20px; 
    height: 100%;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
}
.card{
    text-align: center;
    padding-left:10px;
    margin: 0 15px 
}
.button{
    margin: 10px;
    color: #fff;
    background-color: #409EFF;
    border:1px solid #dcdfe6;
    border-color: #409EFF;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
}
.film_name{
    cursor: pointer;
}
.film_name:hover{
    color: #0487C8
}
</style>
