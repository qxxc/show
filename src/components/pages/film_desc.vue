<template>
    <div>
        <el-head class="index_head"></el-head>
        <div class="head">
            <img :src="info.pimage" alt="">
            <div class="head_text">
                <h1>{{info.pname}}</h1>
                <p>类型:{{info.cname}}</p>
                <p>片长:{{info.length}}</p>
                <p>语言:{{info.planguage}}</p>
                <p>价格:{{info.ticketprice}}</p>
                <p>剧情简介:</p>
                <p class="desc">{{info.pdesc}}</p>
            </div>
        </div>
        <div class="text">
            <Tabs active-key="1" v-model="Get_day" @on-click="Get_plan()">
                <Tab-pane label="今天" key="1" prop="key">
                    <div class="text_head">
                        <span>场次</span>
                        <span>价格</span>
                        <span>操作</span>
                    </div>
                    
                    <div class="text_head1" v-for="item of play_plan">
                        <span>{{ item.schetime }}</span>
                        <span>{{ item.sched_ticket_price }}</span>
                        <span><button @click="shop(item.scheid,item.schetime)">选座购票</button></span>
                    </div>
                </Tab-pane>
                <Tab-pane label="明天" key="2">
	                <div class="text_head">
	                        <span>场次</span>
	                        <span>价格</span>
	                        <span>操作</span>
	                    </div>
	                    
	                    <div class="text_head1" v-for="item of play_plan">
	                        <span>{{ item.schetime }}</span>
	                        <span>{{ item.sched_ticket_price }}</span>
	                        <span><button @click="shop(item.scheid,item.schetime)">选座购票</button></span>
	                    </div>
                    </Tab-pane>
                <Tab-pane label="后天" key="3">
	                <div class="text_head">
	                        <span>场次</span>
	                        <span>价格</span>
	                        <span>操作</span>
	                    </div>
	                    
	                    <div class="text_head1" v-for="item of play_plan">
	                        <span>{{ item.schetime }}</span>
	                        <span>{{ item.sched_ticket_price }}</span>
	                        <span><button @click="shop(item.scheid,item.schetime)">选座购票</button></span>
	                    </div>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import server_header from '.././common/head'
import store from '@/vuex/store'
export default {
        store,
    components:{
        'el-head':server_header
    },
    data(){
        return{
            Get_day:0,
            info:{
                pimage:'../../../static/6f2b1b83b512d8ec417efdf09d34faa3316513.jpg',
                pname:'恐怖浴室',
                pid:1,
                language:'中文',
                length:123,
                price:35,
                desc:'案说法解放碑 安抚啊啊我看就卡机卡看啊巴克节哀吧局部尽快把接口比较快不可及不可及尽快把不可及博客博客比较快不看就不看吧 空间博客吧看背靠背空间布局看就看吧吧科技部吧接口吧'
            },
            play_plan:[
                {
                    scheid:1,
                    stuname:'一号演出厅',
                    pname:'复仇者联盟',
                    schetime:"Jun 7, 2018 8:10:00 AM",
                    sched_ticket_price:45.0
                },
                {
                    scheid:2,
                    stuname:'一号演出厅',
                    pname:'复仇者联盟',
                    schetime:"Jun 7, 2018 8:10:00 AM",
                    sched_ticket_price:45.0
                },
                {
                    scheid:3,
                    stuname:'一号演出厅',
                    pname:'复仇者联盟',
                    schetime:"Jun 7, 2018 8:10:00 AM",
                    sched_ticket_price:45.0
                }
            ]
        }
    },
    methods:{
		    shop(id,time){
		            var that=this;
		            if(this.$store.state.status){
		            this.$router.push({
		                path:'/shop',
		                query:{
		                    schetime:time,
		                    scheid:id,
		                    pid:that.$route.query.pid,
		                }
		            });
		            }else{
		                this.$Message.error('请登录')
		            }
        },
        Get_plan(){
            var that=this;
            this.$axios({
                method:'GET',
                url:'http://111.230.128.231:8080/TTMS/selectSeatTicket?method=selectSchedule',
                params:{
                    pid:that.$route.query.pid,
                    day:that.Get_day+1
                }
            }).then(function(response){
                that.play_plan=response.data;
            }).catch(function(response){
                console.log('出错了')
            })
        }
    },
    created(){
        var that=this;
        this.$axios({
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/play?method=playCateInfo',
            params:{
                pid:that.$route.query.pid
            }
        }).then(function(response){
            that.info=response.data[0];
        }).catch(function(response){
            console.log('出错了')
        })
        this.$axios({
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/play?method=playCateInfo',
            params:{
                pid:that.$route.query.pid
            }
        }).then(function(response){
            that.info=response.data[0];
        }).catch(function(response){
            console.log('出错了')
        })
    }
}
</script>

<style scoped>
.head{
    background-color: #8192BA;
    padding:30px 100px 30px 30px;
    overflow: auto;
}
.head img{
    width: 210px;
    height: 310px;
    float: left;
}
.head_text{
    margin-left:250px ;
    color:#f3f3f3;
}
.head_text p{
    font-size: 16px;
    
}
.desc{
    text-indent:34px
}
.text{
    margin: 20px 50px;
    height: 300px;
}
.text_head{
    height: 20px;
}
.text_head span{
    display: inline-block;
    width: 24%;
    text-align: center
}

.text_head1 span{
    display: inline-block;
    width: 24%;
    text-align: center;
}
.text_head1 button{
    margin: 10px;
    color: #fff;
    background-color: #409EFF;
    border:1px solid #dcdfe6;
    border-color: #409EFF;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
}
</style>

