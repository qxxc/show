<template>
  <div id="app">
    <div class="layout">
     
      <div>
        <router-view/>
      </div>
      <div class="layout-copy">
          2018 &copy; ZhiFeiJi
      </div>
    </div>
    
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
    store,
    name: 'App',
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        change_status(){
            this.$store.state.status=false;
            this.$store.state.username='';
            this.$store.state.password='';
            this.$store.state.email='';
            this.$store.state.telephone='';
            this.$store.state.address='';
            this.$store.state.uid='';
            this.$router.push({path:'/',query:{}})
        }
    }
}
</script>

<style>
#app {
  padding: 0;
  margin:0;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-ceiling{
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
    font-size: 20px
}
.layout-ceiling-main{
    float: right;
    margin-right: 15px;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
</style>