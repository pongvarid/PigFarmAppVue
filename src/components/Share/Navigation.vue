<!----------Make By YourName---------------->
 <template>
 <v-content>
       <v-toolbar class="lblue" dark>
     <v-icon>mdi mdi-pig</v-icon>
    <v-toolbar-title>สวัสดี {{user['name']}}</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
 </v-content>
</template>

    <script>
    	import { get } from "vuex-pathify"; 
export default {
    name: 'Root',
    /*-------------------------Load Component---------------------------------------*/
    components: {

    },
  /*-------------------------Set Component---------------------------------------*/
props:{

},
    /*-------------------------DataVarible---------------------------------------*/
    data() {
    return {

        };
    }, 
    /*-------------------------Run Methods when Start this Page------------------------------------------*/
     async mounted() {
    /**** Call loading methods*/
            this.load(); 
    },
    /*-------------------------Run Methods when Start Routed------------------------------------------*/
     async beforeRouteEnter(to, from, next) { 
        next()
    },
    /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
    computed:{
        user:get('login/user')
},
    /*-------------------------Methods------------------------------------------*/
methods:{
    /******* Methods default run ******/
    load:async function(){
}
},
    }
</script>