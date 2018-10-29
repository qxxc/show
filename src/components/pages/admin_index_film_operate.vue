<template>
    <el-tabs  class='film_cao'>
        



        <el-tab-pane label="查找/修改">
            <el-form :inline="true" :model="film_select"  class="demo-form-inline">
                <el-form-item label="电影名称">
                    <el-input v-model="film_select.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                </el-form-item>
            </el-form>
            <el-col :span='12'>
                <div class="select_info">
                    <img :src="film_select_res.pimage" alt="">
                    <div>
                        <p> 电影名称：{{film_select_res.pname}}</p>
                        <p> 电影类型：{{film_select_res.cid}}</p>
                        <p> 语言类型：{{film_select_res.planguage}}</p>
                        <p> 是否热门：{{film_select_res.pishot}}</p>
                        <p> 电影时长：{{film_select_res.length}}</p>
                        <p> 电影价格：{{film_select_res.ticketprice}}</p>
                        <p> 电影描述：{{film_select_res.pdesc}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span='11' style="margin-top:-30px">
                <el-form :model="ruleForm"  ref="ruleForm"  label-width="100px" class="demo-ruleForm">
                    <el-form-item label="要修改的电影" prop="pname1">
                        <el-input v-model="ruleForm.pname1"></el-input>
                    </el-form-item>
                    <el-form-item label="修改后的电影" prop="pname2">
                        <el-input v-model="ruleForm.pname2"></el-input>
                    </el-form-item>
                    <el-form-item label="电影类型" prop="cid">
                        <el-select v-model="ruleForm.cid" placeholder="请选择电影类型">
                            <el-option label="科幻" value="1"></el-option>
                            <el-option label="动作" value="2"></el-option>
                            <el-option label="爱情" value="3"></el-option>
                            <el-option label="战争" value="4"></el-option>
                            <el-option label="喜剧" value="5"></el-option>
                            <el-option label="惊悚" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="语言类别" prop="planguage">
                        <el-select v-model="ruleForm.planguage" placeholder="请选择语言类别">
                            <el-option label="汉语" value="汉语"></el-option>
                            <el-option label="英语" value="英语"></el-option>
                            <el-option label="日语" value="日语"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否热门" prop="pishot">
                        <el-select v-model="ruleForm.pishot">
                            <el-option label="热门" value="1"></el-option>
                            <el-option label="非热门" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间长度" prop="length">
                        <el-input v-model.number="ruleForm.length"></el-input>
                    </el-form-item>
                    <el-form-item label="电影价格" prop="ticketprice">
                        <el-input v-model.number="ruleForm.ticketprice"></el-input>
                    </el-form-item>
                    <el-form-item label="电影描述" prop="pdesc">
                        <el-input type="textarea" v-model="ruleForm.pdesc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col> 
            <el-col :span="1">

            </el-col>
        </el-tab-pane>




        <el-tab-pane label="添加">
            <form action="http://111.230.128.231:8080/TTMS/playAdd" method="post" class="form-insert" enctype="multipart/form-data">
                <p><span>电影名称</span><input type="text" name="pname" placeholder="请输入电影名称"></p>
                
                <p><span>上传图片</span><input type="file" name="pimage"></p>
                <p><span>选择类型</span><select name="cid" id="">
                    <option value="1">科幻</option>
                    <option value="2">动作</option>
                    <option value="3">爱情</option>
                    <option value="4">战争</option>
                    <option value="5">喜剧</option>
                    <option value="6">惊悚</option>
                </select></p>
                <p><span>选择语种</span><select name="planguage" id="">
                    <option value="英">英</option>
                    <option value="日">日</option>
                    <option value="汉">汉</option>
                </select></p>
                <p><span>是否热门</span><select name="pishot" id="">
                    <option value="1">热门</option>
                    <option value="0">非热门</option>
                </select></p>
                <p><span>输入时长</span><input type="text" name="length"></p>
                <p><span>输入价格</span><input type="text" name="ticketprice"></p>
                <p><span>相关描述</span><textarea maxlength="255" cols="100" rows='5' name="pdesc"></textarea></p>
                <input type="submit" value="添加数据">
            </form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    data(){
        var checkTime = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 0) {
                    callback(new Error('电影时间不能为负值'));
                } else {
                    callback();
                }
            }
            }, 1);
        };
        var checkPrice = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('价格不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
               if (value < 0) {
                    callback(new Error('电影价格不能为负值'));
                } else {
                    callback();
                }
            }
            }, 1);
        };
        return{
            param:"",
            src:'',
            activeName: 'second',
            film_select:{
                name:'',
            },
            film_select_res:{
                pname:'暂无数据',
                pimage:'../../../static/7e1f6616b82f532e167a730452c90b9d653258.png',
                cid:'暂无数据',
                planguage:'暂无数据',
                pishot:'暂无数据',
                length:'暂无数据',
                ticketprice:'暂无数据',
                pdesc:'暂无数据',
            },
            ruleForm: {
                pname1:'',
                pname2:'',
                cid: '',
                planguage: '',
                pishot: '',
                length: '',
                ticketprice: '',
                pdesc: ''
            },
            
        }
    },
    methods: {
        onSubmit(){
            //查询电影信息
            var that=this;
            if(this.film_select.name!=''){
                this.$axios({
                    post:'GET',
                    url:'http://111.230.128.231:8080/TTMS/play?method=findPlayByWord',
                    params:{
                        name:that.film_select.name
                    }
                }).then(function(response){
                    that.film_select_res=response.data[0];
                }).catch(function(response){
                    that.open4('出错了');
                })
            }
        },
        submitForm(formName) {
            //提交修改信息
            var that=this;
            this.$axios({
                method:'POST',
                url:'http://111.230.128.231:8080/TTMS/playUpdate',
                params:that.ruleForm,
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
            }).then(function(response){
                that.open2('修改成功');
            }).catch(function(response){
                that.open4('修改失败');
            })
        },
        resetForm(formName) {
            //重置修改表单
            this.$refs[formName].resetFields();
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
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .form-insert span{
      color: #5F6260;
      margin: 10px;
      font-size: 14px
      }
  .form-insert input[type*='text'],.form-insert select{
      display: inline-block;
      height: 40px;
      width: 202px;
      padding: 0 15px;
      border:1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      line-height: 40px;
      box-sizing:border-box;
  }
  .form-insert p{
      margin: 10px 0;
  }
  .form-insert input[type*='submit']{
      margin: 10px;
      color: #fff;
      background-color: #409EFF;
      border:1px solid #dcdfe6;
      border-color: #409EFF;
      font-size: 14px;
      padding: 12px 20px;
      border-radius: 4px
  }
  .form-insert input[type*='submit']:hover{
      background-color: #35B3FF;
      cursor: pointer
  }
  .select_info{
      padding: 20px;
  }
  .select_info img{
      width: 160px;
      height:220px;
      float: left;
  }
  .select_info div{
      margin-left: 200px;
  }
  .select_info p{
      margin: 5px 20px;
      word-wrap: break-word; 
  }
  .el-form-item{
      margin-bottom: 11px
  }
</style>

