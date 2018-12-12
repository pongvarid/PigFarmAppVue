 
import swal from 'sweetalert2'
const state = {

}
const getters = {

}

const mutations = {

}

const actions = {
    
        async error(context, params){
                swal({
                type: 'error',
                title: 'Oops...',
                text: params, 
                 })
            },

            async success(context, params){
                swal({
                type: 'success',
                title: 'Success...',
                text: params+' have success.',
                }) 
            },

            async info(context, params){
                swal({
                title: params.head,
                text: params.text,
                imageUrl: params.image,
                imageWidth: 160,
                imageHeight: 160,
                })
            }    
 
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
    }