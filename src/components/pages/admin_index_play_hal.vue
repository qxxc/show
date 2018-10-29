<template>
    <div>
        <div style="margin-bottom: 20px;">
            <el-button type="primary" plain  @click="open3()">
                添加演出厅
            </el-button>
        </div>
        <el-tabs style="width:1200px" v-model="editableTabsValue2" type="card" closable
         @tab-remove="removeTab" @tab-click="next_seat()">
            <el-tab-pane
                v-for="(item, index) in editableTabs2"
                :key="item.name"
                :label="item.stuname"
                :name="item.name"
            >
                <div class="seat_box">
                    <div v-for='ite in item.content' style="display:inline-block;width:50px">
                        <i :class='ite.seat_style'></i>
                        <p>{{ite.seatRow}}-{{ite.seatCol}}</p>
                    </div>
                </div>
                <div class="left">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="修改行" prop="seatRow">
                            <el-input v-model="ruleForm.seatRow"></el-input>
                        </el-form-item>
                        <el-form-item label="修改列" prop="seatCol">
                            <el-input v-model="ruleForm.seatCol"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="insert_seat(item.content)">添加</el-button>
                            <el-button type="primary" @click="update_seat(item.content)">修改</el-button>
                            <el-button type="primary" @click="delete_seat(item.content)">删除</el-button>
                        </el-form-item>
                        <el-button type="danger" plain  @click="removeTab(item.content)">
                            删除演出厅
                        </el-button>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          seatRow: '',
          seatCol: '',
          resource: ''
        },
        rules: {
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        editableTabsValue2: '1',
        editableTabs2: [{
          stuname: '1号演出厅',
          content:[]
        }, {
          stuname: '2号演出厅',
          content:[]
        },{
          stuname: '3号演出厅',
          content:[]
        }
        ],
        tabIndex: 3,
        info:[],
        seat_info:[],
        set_info:[]
      }
    },
    created(){
        var that=this;
        //获取全部演出厅
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/ManagerStudio?method=getAllStudio',
            method:'GET',
        }).then(function(res){
            that.editableTabs2=res.data;
            for(var i in that.editableTabs2){
            that.editableTabs2[i].content=[]
            }
            that.tabIndex=res.data.length;
        })
        //请求所有的座位数据
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/managerSeat?method=getSeatByStuId',
            method:'GET',
            params:{
                stuid:2
            }
        }).then(function(res) {
            that.info=res.data;
            that.zhuanhuan.call(that,2)
        }).catch(function(res){
        console.log(res);
            that.open4('出错了');
        })
    },
    methods: {
        open3() {
        this.$prompt('请输入演出厅名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '名字格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的新演出厅名称是: ' + value
          });
          this.addTab(value);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      addTab(newTabName){
          //添加演出厅
          var that=this;
          this.$axios({
              url:'http://111.230.128.231:8080/TTMS/ManagerStudio?method=insert',
              method:'POST',
              params:{
                  stuname:newTabName
              }
          }).then(function(res){
            that.open2('添加成功,请刷新页面')
          }).catch(function(res){
            that.open2('添加失败')
          })
      },
      next_seat(){
          var that=this;
          //请求下一个演出厅信息
          this.$axios({
              url:'http://111.230.128.231:8080/TTMS/managerSeat?method=getSeatByStuId',
              method:'POST',
              params:{
                  stuid:that.editableTabs2[that.editableTabsValue2].stuid
              }
          }).then(function(res){
              that.info=res.data;
   						that.zhuanhuan.call(that,that.editableTabs2[parseInt(that.editableTabsValue2)].stuid)
          })
      },
      zhuanhuan(id){
      this.editableTabs2[parseInt(this.editableTabsValue2)].content=[];
      console.log(this.info)
      var count=0
              for(var i=1;i<=8;i++){
                    for(var j=1;j<=8;j++){
	                    if(this.info[count]!=null&&this.info[count].seatRow==i&&this.info[count].seatCol==j){
	                        if(this.info[count].status==1){
		                        count++;
		                        this.editableTabs2[parseInt(this.editableTabsValue2)].content.push({
		                        seat_style:'iconfont icon-zuoweixuanzhong',
		                        seatRow:i,
		                        seatCol:j,
		                        stuid:id,
		                        seatid:this.info[count-1].seatid	
		                        })
	                        }
	                        else{
	                        	count++;
		                        this.editableTabs2[parseInt(this.editableTabsValue2)].content.push({
		                        seat_style:'iconfont icon-zuowei-yishou-copy1',
		                        seatRow:i,
		                        seatCol:j,
		                        stuid:id,
		                        seatid:this.info[count-1].seatid
		                        })
	                        }
	                    }else{
	                    	this.editableTabs2[parseInt(this.editableTabsValue2)].content.push({
	                        seat_style:'iconfont icon-plus',
	                        seatRow:i,
	                        seatCol:j,
	                        stuid:id,
	                    	})
                    	}
                  	}      
            			}
            },
      removeTab(msg) {
        this.$axios({
            url:'http://111.230.128.231:8080/TTMS/ManagerStudio?method=delete',
            method:'POST',
            params:{
                stuid:msg[0].stuid
            }
        }).then(function(res){
            that.open2("删除成功")
        }).catch(function(res){
            that.open4("删除失败")
        })
      },
      insert_seat(msg){
        var that=this;
        msg=msg.filter(tab=>tab.seatRow==this.ruleForm.seatRow&&tab.seatCol==this.ruleForm.seatCol)
        console.log(msg);
        if(msg[0].seatid==null){
            this.$axios({
                method:'post',
                url:'http://111.230.128.231:8080/TTMS/managerSeat?method=insert',
                params:{
                    stuid:msg[0].stuid,
                    seatCol:msg[0].seatCol,
                    seatRow:msg[0].seatRow
                },
                headers:{
                'Content-type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }]
            }).then(function(res) {
                if(res.data=1){
                   that.open2("添加成功")
                }
            }).catch(function(){
                that.open4('出错了')
            });
        }else {
            that.open4('座位已存在')
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
      update_seat(msg){
        var that=this;
        msg=msg.filter(tab=>tab.seatRow==this.ruleForm.seatRow&&tab.seatCol==this.ruleForm.seatCol)
        console.log(msg);
        if(msg[0].seatid!=null){
            this.$axios({
                method:'post',
                url:'http://111.230.128.231:8080/TTMS/managerSeat?method=update',
                params:{seatid:msg[0].seatid},
                headers:{
                'Content-type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }]
            }).then(function(res) {
                if(res.data=1){
                    that.open2("修改成功")
                }
            }).catch(function(){
                that.open4('出错了')
            });
        }else{
            that.open4('座位不存在')
        }
      },
      delete_seat(msg){
        var that=this;
        msg=msg.filter(tab=>tab.seatRow==this.ruleForm.seatRow&&tab.seatCol==this.ruleForm.seatCol)
        console.log(msg);
        if(msg[0].seatid!=null){
            this.$axios({
                method:'post',
                url:'http://111.230.128.231:8080/TTMS/managerSeat?method=delete',
                params:{seatid:msg[0].seatid},
                headers:{
                'Content-type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }]
            }).then(function(res) {
                if(res.data=1){
                    that.open2("删除成功")
                }
            }).catch(function(){
                that.open4('出错了')
            });
        }else{
            that.open4('座位不存在')
        }
      }
    },
    
    

  }
</script>

<style>
.iconfont{
  font-size: 34px;
}
.icon-zuowei_kexuan:before { 
  content: "\e675"; 
  color: antiquewhite;
  }
.icon-zuowei-yishou-copy1:before {
   content: "\e601";
   color:#FF5F5F
    }
.icon-zuoweixuanzhong:before {
   content: "\e635"; 
   color:#3FAE49
   }
.seat_box{
    width: 400px;
    display: inline-block;
    vertical-align:top;
}
.left{
    margin-left: 20px;
    display: inline-block;
}

</style>
