import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const state = {
    status:false,
    username: '',
    uid:'',
    password:'',
    email:'',
    telephone:'',
    address:''
}
export default new Vuex.Store({
    state
})