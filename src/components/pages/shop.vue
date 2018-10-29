<template>
    <div class="box">
    <el-head class="index_head"></el-head>
        <Row>
            <i-col span="16" class="left" >
                <div style="margin:0px auto;text-align:center">
                    <i class="iconfont icon-pingmu101" style="font-size:50px"></i>
                    <p>荧屏中间</p>
                </div>
                <div>
                    <p v-for="Row in 8" >
                        <span style="margin:0px 65px">第{{Row}}排</span>
                        <span v-for="Col in 8" style="display:inline-block;margin-left:9px;width:40px;height:40px;">
                            <i class="iconfont icon-zuowei_kexuan" :style="set_seat_style(Row,Col)" @click="chang_status(Row,Col)"></i>
                        </span>
                    </p>
                </div>
            </i-col>
            <i-col span="8" class="right">
                <p class="header">电影票</p>
                <div style="margin: 10px 20px 0px 20px;">
                    <img :src="info.pimage" style="width:30%;vertical-align:top">
                    <div style="display:inline-block;width:40%;padding:10px 10px;">
                        <h2>{{info.pname}}</h2>
                        <p>类型:{{info.cname}}</p>
                        <p>语言:{{info.planguage}}</p>
                    </div>
                    <p style="margin-top:10px">场次:{{this.$route.query.schetime}}</p>
                    <p style="margin-top:10px">座位:
                        <span v-for="item of seat_choose">{{item.seatRow}}排{{item.seatCol}}列</span>
                    </p>
                    <p style="margin-top:10px">票价:{{info.ticketprice}}元/张</p>
                    <p style="margin-top:10px">票数:{{seat_count}}</p>
                    <p style="background-color:#D2CFCA;height:1px;margin-top:10pxs"></p>
                    <p style="margin-top:10px">总价:
                        <span style="color:#FF7B07;font-size:24px"><Icon type="social-yen"></Icon>{{total_price}}</span>
                    </p>
                    <p style="margin:20px 0px"><i-button @click="sumbit_order" type="warning" long size="large">结算</i-button></p>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
import store from '@/vuex/store'
import server_header from '.././common/head'
export default {
    store,
    components:{
        'el-head':server_header
    },
    data(){
        return {
        	info:{},
            seat_info:[{
                seatCol:1,
                seatRow:1,
                seat_status:1,
            },
            {
                seatCol:2,
                seatRow:1,
                seat_status:1,
            },
            {
                seatCol:3,
                seatRow:2,
                seat_status:1,
            },{
                seatCol:3,
                seatRow:3,
                seat_status:1,
            }],
            ticket_info:[
                    {
                    seatCol:3,
                    seatRow:3,
                    seat_status:1,
                }
            ],
            classes:[],
            seat_count:0,
            seat_choose:[],
            total_price:0
        }
    },
    methods:{
    		sumbit_order(){
            var that=this;
            this.$axios({
            //提交购票信息
                method:'POST',
                url:'http://111.230.128.231:8080/TTMS/selectSeatTicket?method=selectSeat',
                params:{
                    scheid:that.$route.query.scheid,
                    seat:that.seat_choose,
                    saletotals:that.total_price,
                    uid:that.$store.state.uid
                }
            }).then(function(response){
                that.$Message.success('提交成功');
            }).catch(function(response){
                that.$Message.error('出错了');
            })
        },
        chang_status(Row,Col){
            var seat_Row_info=this.seat_info.filter(tab => tab.seatRow==Row&&tab.seatCol==Col);
            var seat_chooses=this.seat_choose.filter(tab=> tab.seatRow==Row&&tab.seatCol==Col)
            var ticket_info=this.ticket_info.filter(tab => tab.seatRow==Row&&tab.seatCol==Col);
            if(seat_Row_info.length==1&&seat_chooses.length!=1&&ticket_info.length!=1){
                this.seat_choose.push({
                    seatRow:Row,
                    seatCol:Col
                })
                this.seat_count++;
                this.total_price=this.seat_count*this.info.ticketprice;
            }else if(seat_Row_info.length==1&&seat_chooses.length==1&&ticket_info.length!=1){
                this.seat_choose=this.seat_choose.filter(tab=> tab.seatRow!=Row||tab.seatCol!=Col);
                this.seat_count--;
                this.total_price=this.seat_count*this.info.ticketprice;
            }
        },
        set_seat_style(Row,Col){
            var seat_Row_info=this.seat_info.filter(tab => tab.seatRow==Row&&tab.seatCol==Col);
            var ticket_info=this.ticket_info.filter(tab => tab.seatRow==Row&&tab.seatCol==Col);
            var seat_chooses=this.seat_choose.filter(tab=> tab.seatRow==Row&&tab.seatCol==Col)
            if(seat_Row_info.length==1&&ticket_info.length!=1&&seat_chooses.length!=1){
                return "color:#5cadff;cursor: pointer;"
            }else if(seat_Row_info.length==1&&ticket_info.length==1&&seat_chooses.length!=1){
                return 'color:#FF514F;'
            }else if(seat_Row_info.length==1&&ticket_info.length!=1&&seat_chooses.length==1){
                return 'color:#13AE4E;cursor: pointer;'
            }else{
                return 'color:white'
            }
        }
    },
    created(){
        var that=this;
        this.$axios({
            //请求座位信息
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/selectSeatTicket?method=findSeatByScheId',
            params:{
                scheid:that.$route.query.scheid
            }
        }).then(function(response){
            that.seat_info=response.data;
            
        }).catch(function(response){
            console.log('出错了')
        })
        this.$axios({
            //请求售票信息
            method:'GET',
            url:'http://111.230.128.231:8080/TTMS/selectSeatTicket?method=findStatusByscheId',
            params:{
                scheid:that.$route.query.scheid
            }
        }).then(function(response){
            that.ticket_info=response.data;
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
            console.log(response.data[0])
        }).catch(function(response){
            console.log('出错了')
        })
    }
}
</script>

<style scoped>
.box{
    font-size:14px;
}
.left{
    border-right:1px #E7E6E2 solid;
    background-color: white;
    height: 500px;
}
.right{
    background-color: white;
    height: 500px;
}
.header{
    height: 30px;
    line-height: 30px;
    color: white;
    padding: 0px 10px;
    font-size: 14px;
    background-color: #067199;
    margin: 50px 20px 0px 20px;
}
.iconfont{
    font-size: 26px;
}
</style>

