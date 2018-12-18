import axios from '@/axios'
import _ from 'lodash'
import store from '../index';
const state = {
    vaccine:[],
    medicine:[],
}
const getters = {

}

const mutations = {

}

const actions = {

async getVaccine() {
let load = axios.get('/api/choices/VACCINE')
    .then((r) => {
        state.vaccine =   r.data.children;
    }).catch((e) => {

});
    }, 

    async getMecicine() {
        let load = axios.get('/api/choices/MEDICINE')
            .then((r) => {
                state.medicine =   r.data.children;
            }).catch((e) => {
        
        });
            }, 

            async storeVaccine(context, params) { 
                await axios
                 .post("/api/farm/pigs/"+params.pig_id+"/cycles/"+params.pig_cycle_id+"/vaccine",params)
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