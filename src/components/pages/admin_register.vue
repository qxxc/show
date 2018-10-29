<template>
    <div>
        <el-container>
            <el-head></el-head>
            <el-main>
                <div>
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="telephone">
                            <el-input type="text" v-model="ruleForm2.telephone"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input type="text" v-model="ruleForm2.email"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                            <el-input type="text" v-model="ruleForm2.address"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                            <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
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
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else {
            callback();
            }
        };
        var checkTelephone = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('电话号码不能为空'));
            }
            if (value.search(/\d{11}/)) {
            callback(new Error('请输入正确的电话号码'));
            } 
            else{
                callback()
            }
            
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入Email'));
            } else {
            if (this.ruleForm2.email.search(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)==-1) {
                callback(new Error('请输入正确的Email'));
            }
            else{
                callback();
            }
            }
        };
        var validateAddress= (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入地址'));
            } else {
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            ruleForm2: {
            username:'',
            pass: '',
            checkPass: '',
            telephone: '',
            email:'',
            address:''
            },
            rules2: {
            username:[
                { validator: validateUsername, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            telephone: [
                { validator: checkTelephone, trigger: 'blur' }
            ],
            email: [
                { validator: validateEmail, trigger: 'blur' }
            ],
            address: [
                { validator: validateAddress, trigger: 'blur' }
            ]
            }
        };
    },
    components:{
        'el-head':server_header
    },
    methods:{
        sumbit(){
            var that = this;
            this.$axios({
                method:'POST',
                url:'./http://111.230.128.231:8080/',
                data:that.data,
                transformRequest:[function(data){
                    data=qs.stringify(that.data);
                    return data
                }]
            })
            .then(function(response){
                console.log(response.data)
            })
            .catch(function(response){
                console.log('出错了');
            })
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
