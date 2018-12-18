import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'; 
import loading from './loading';
import alert from "./alert"
import login from "./login"
import pig from "./pig"
import cycles from "./cycles"
import breeder from "./Cycles/breeder"
import birth from "./Cycles/birth"
import feed from "./Cycles/feed"
import feedout from "./Cycles/feedout"
import milk from "./Cycles/milk"
import vaccine from "./Cycles/vaccine"
Vue.use(Vuex)

const modules = {
    loading : loading,
    login : login,
    pig:pig,
    alert:alert,
    cycles:cycles,
    breeder:breeder,
    birth:birth,
    feed:feed,
    feedout:feedout,
    milk:milk,
    vaccine:vaccine
    
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
