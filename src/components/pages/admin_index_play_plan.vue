<template>
    <div>
        <div v-if="is_show==1">
            <div>
                <el-button style="float:right" type="primary" @click="go()">添加新的演出计划</el-button>
            </div>
            <el-table :data="play_plan" style="width: 100%">
                <el-table-column prop="scheid" label="ID" width="150"></el-table-column>
                <el-table-column prop="stuname" label="放映厅" width="120"></el-table-column>
                <el-table-column prop="pname" label="影片" width="120"></el-table-column>
                <el-table-column prop="schetime" label="放映时间"></el-table-column>
                <el-table-column prop="sched_ticket_price" label="售价"  width="120"></el-table-column>
                <el-table-column label="操作"  fixed="right" width="240">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="updateRow(scope.$index,play_plan)" type="primary" size="small">
                        修改
                        </el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index,play_plan)" type="danger" size="small">
                        移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="is_show==2">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="映厅选择">
                    <el-select v-model="form.stuid" placeholder="请选择放映厅">
                        <el-option v-for='item of play_info' :label='item.stuname' :value="item.stuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="剧目选择">
                    <el-select v-model="form.pid" placeholder="请选择电影">
                        <el-option v-for="item of film_info" :label="item.pname" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="放映时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="电影价格">
                    <el-input type="text" v-model="form.ticket_price"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">立即创建</el-button>
                    <el-button @click="recome">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="is_show==3">
            <el-form ref="form" :model="update_form" label-width="80px">
                <el-form-item label="选择映厅">
                    <el-select v-model="update_form.stuid" placeholder="请选择放映厅">
                        <el-option v-for='item of play_info' :label='item.stuname' :value="item.stuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择剧目">
                    <el-select v-model="update_form.pid" placeholder="请选择电影">
                        <el-option v-for="item of film_info" :label="item.pname" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="update_form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="update_form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="修改价格">
                    <el-input type="text" v-model="update_form.ticket_price"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(1)">确认修改</el-button>
                    <el-button @click="recome">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
    data(){
        return{
            is_show:1,
            form: {
                stuid: '',
                pid: '',
                date1: '',
                date2: '',
                ticket_price: ''
            },
            update_form:{
                scheid:'',
                stuid: '',
                pid: '',
                date1: '',
                date2: '',
                ticket_price: ''
            },
            play_info:[],
            film_info:[],
            play_plan:[]
        }
    },
    created(){
        var that=this
        //获取演出厅信息
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/ManagerStudio?method=getAllStudio',
            method:'GET'
        }).then(function(res){
            that.play_info=res.data;
            console.log(res)
        }).catch(function(res){
            console.log(res)
            that.open4('出错了')
        })

        //获取电影信息
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/managerPlay?method=findAllPlay',
            method:'GET'
        }).then(function(res){
            that.film_info=res.data;
            console.log(res)
        }).catch(function(res){
            console.log(res)
            that.open4('出错了')
        })


        //获取演出计划
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/managerSchedule?method=getAllSchedule',
            method:'GET'
        }).then(function(res){
            that.play_plan=res.data;
            console.log(res)
        }).catch(function(res){
            console.log(res)
            that.open4('出错了')
        })
    },
    methods: {
        recome(){
            this.is_show=1;
        },
        go(){
            this.is_show=2;
        },
        deleteRow(index, rows) {
            //删除演出计划
            var that=this
            console.log(rows[index].scheid)
            
            this.$axios({
                url:'http://111.230.128.231:8080/TTMS/managerSchedule?method=delete',
                methos:'POST',
                params:{
                    scheid:rows[index].scheid
                }
            }).then(function(res){
                that.open2('删除成功')
            }).catch(function(res){
                that.open4('出错了')
            })
            rows.splice(index, 1);
        },
        updateRow(index, rows){
            this.is_show=3
            this.update_form.scheid=rows[index].scheid;
        },
        onSubmit(id){
            //添加/修改演出计划
            var that=this
            var sub_url,sub_data,date1,date2,date;
            if(id){
                date1=new Date(this.update_form.date1).Format("yyyy-MM-dd");
                date2=new Date(this.update_form.date2).Format("HH:mm:ss");
                date=date1+' '+date2;
                sub_url='http://111.230.128.231:8080/TTMS/managerSchedule?method=update'
                sub_data={
                    scheid:that.update_form.scheid,
                    stuid:that.update_form.stuid,
                    pid:that.update_form.pid,
                    sched_ticket_price:that.update_form.ticket_price,
                    schetime:date
                }
            }else{
                date1=new Date(this.form.date1).Format("yyyy-MM-dd");
                date2=new Date(this.form.date2).Format("HH:mm:ss");
                date=date1+' '+date2;
                sub_url='http://111.230.128.231:8080/TTMS/managerSchedule?method=insert'
                sub_data={
                    stuid:that.form.stuid,
                    pid:that.form.pid,
                    sched_ticket_price:that.form.ticket_price,
                    schetime:date
                }
            }
            this.$axios({
                url:sub_url,
                method:'POST',
                params:sub_data
            }).then(function(res){
            		if(id){ that.open2('修改成功')}
                else{
                   if(res.data==1){
                       that.open2('添加成功')
                   }
                   else{
                       that.open4('添加失败')
                   }
                }
            }).catch(function(){
                that.open4('出错了')
            })
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
    },
}
</script>

<style scoped>

</style>

