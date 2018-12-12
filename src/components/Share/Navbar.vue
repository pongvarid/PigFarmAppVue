<!----------Make By YourName---------------->
 <template>
  <v-content>
       <v-toolbar class="lblue" dark>
   <v-icon @click="$router.go(-1)">mdi mdi-arrow-left-bold-circle-outline</v-icon>
    <v-toolbar-title @click="$router.go(-1)">กลับ</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
 </v-content>
</template>

    <script>
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

},
    /*-------------------------Methods------------------------------------------*/
methods:{
    /******* Methods default run ******/
    load:async function(){
}
},
    }
</script>