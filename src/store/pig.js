import axios from '@/axios'
import store from '@/store/';
const state = {
    pigChoose:{},
}
const getters = {

}

const mutations = {

}

const actions = {
    async findPig(context,params) {
        let load = axios.get('/api/farm/pigs?keyword=' + params)
            .then((r) => {
                store.dispatch('alert/success', 'Pig');
                state.pigChoose = r.data;
                return r.data;
            }).catch((e) => {
                store.dispatch('alert/error', e);
            });
        return load;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}