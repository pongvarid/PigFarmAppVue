import axios from "@/axios"

const state = {
    loginForm : {},
    user:JSON.parse(localStorage.getItem('user')),
}

const getters = {}

const mutations = {
 
}

const actions = {

    login: async (context,params) => {
        window.console.log("user/login")
        let result = await axios.post('/api/auth/login', params)
            .then((r) => {
                window.console.log("login/login", r.data)
                let storage = window.localStorage; 
                storage.setItem("user",JSON.stringify(r.data));  
                storage.setItem("token", r.data.accessToken)
                axios.defaults.headers.common['Authorization'] = `Bearer ${storage.getItem('token')}`;
                window.console.log('login/login', 'finish') 
                return r.data;
            }).catch((error) => {
                window.console.error(error.stack)
            })
      
        return result
    },
    logout : async () =>{
        localStorage.removeItem("user") 
        localStorage.removeItem("token") 
    }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
