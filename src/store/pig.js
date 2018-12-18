import axios from '@/axios'
import store from '@/store/';
const state = {
    pigChoose:{},
}
const getters = {

    setPigChoose: (state) => (pig) => {
         state.pigChoose = pig;
    }

}

const mutations = {

}

const actions = {

    async findPig(context,params) {
        let load = axios.get('/api/farm/pigs?keyword=' + params)
            .then((r) => {
            
                state.pigChoose = r.data;
                return r.data;
            }).catch((e) => {
                store.dispatch('alert/error', e);
            });
        return load;
    },
    createCycle: async function (context, params) {
        let result = await axios.post('/api/farm/pigs/' + params + "/cycles", {})
            .then((r) => {
                return r.data
            })
            .catch((e) => {
                store.dispatch('alert/error', e);
                return null;
            })
        return result;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}