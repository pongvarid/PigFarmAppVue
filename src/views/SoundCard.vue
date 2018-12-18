<!----------Make By YourName---------------->
 <template>
  <v-content>
    <Navbar/>
       <FindPig/> 
  </v-content>
</template>

    <script>
import { get } from "vuex-pathify";
import FindPig from '@/components/SoundCard/FindPig';
 import Navbar from '@/components/Share/Navbar';
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {FindPig,Navbar},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {};
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
    user: get("login/user")
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>