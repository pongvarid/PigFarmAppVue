<!----------Make By YourName---------------->
 <template>
  <v-content>
    <Navbar/>

    <Cycles/>
    
  </v-content>
</template>

    <script>
import { get } from "vuex-pathify";
import Navbar from "@/components/Share/Navbar";
import Cycles from "@/components/PigManager/Cycles"; 
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {
    Navbar,Cycles
  },
  /*-------------------------Set Component---------------------------------------*/
  props: {},
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
    next();
  },
  /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
  computed: {
 
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    
    reFoundPig: async function(){
        
    },
    /******* Methods default run ******/
    load: async function() {
 
    }
  }
};
</script>