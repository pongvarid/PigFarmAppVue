import axios from '@/axios'
import store from '@/store/';
const state = {
    cycleChoose:{},
    form: {
        with: ["cycles", "cycles.breeders", "cycles.birth", "cycles.milk", "cycles.vaccine", "cycles.feed", "cycles.feedout"]
      },
    choose:0,
}
const getters = {

    setCycleChoose: (state) => (cycle) => {
         state.cycleChoose = cycle;
    },
    setChoose: (state) => (choose) => {
        state.choose = choose;
   }

}

const mutations = {

}

const actions = {

  async findPig(context,params) {
    
        let load = axios.get('/api/farm/pigs/'+params.user+'/cycles/'+params.cycle)
            .then((r) => { 
                state.cycleChoose = r.data;
                console.log('findPig',r.data);
                return r.data;
            }).catch((e) => {
                store.dispatch('alert/error', e);
            });
        return load;
    },
    
    async findVaccine(context,params) {
        let data = [];
        let load = await axios.get('/api/farm/pigs/'+params.id,{ params: state.form })
            .then((r) => {  
                data = r.data; 
                return r.data;
            }).catch((e) => {
                store.dispatch('alert/error', e);
            });
        return data;
    },
    
    async findCycle(context,params) {
        let tmp = null;
        let load = await axios.get('/api/farm/pigs/'+params.id+'/cycles/'+params.cycle_id)
            .then((r) => { 
                state.pigChoose = r.data;
                tmp = r.data;
          
            }).catch((e) => {
                store.dispatch('alert/error', e);
            });

            return tmp;
    
    },

   

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}