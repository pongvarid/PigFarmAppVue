import moment from 'moment';
import swal from 'sweetalert2'
const state = {

}
const getters = {
    format: (state) => (date) => {
        return moment(date, "DD-MM-YYYY");
   },
   thai: (state) => (date) => {
        return moment(date)
        .locale("th")
        .add(543, "years")
        .format("DD-MM-YYYY"); 
    }
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

            async havePig(context, params){
                swal({
                type: 'success',
                title: 'Success...',
                text: params,
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