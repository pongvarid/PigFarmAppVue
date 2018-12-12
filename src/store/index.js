import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'; 
import loading from './loading';
import alert from "./alert"
import login from "./login"
import pig from "./pig"
 
Vue.use(Vuex)

const modules = {
    loading : loading,
    login : login,
    pig:pig,
    alert:alert
    
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
