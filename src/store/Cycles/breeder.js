import axios from '@/axios'
import _ from 'lodash'
import store from '../index';
const state = {

}
const getters = {

}

const mutations = {

}

const actions = {
 
    async storeBreeder(context, params) { 
       await axios
        .post("/api/farm/pigs/"+params.pig_id+"/cycles/"+params.pig_cycle_id+"/breeder",params)
        .then(function(r) {
          store.dispatch('alert/success','บันทึกข้อมูลสำเร็จ');
        })
        .catch(function(error) {
            store.dispatch('alert/error',error);
        });
      },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
    }