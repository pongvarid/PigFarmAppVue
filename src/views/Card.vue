<!----------Make By YourName---------------->
 <template>
  <v-content>
    <Navbar/>
      <pdf :src="url+'/card/'+pigChoose.data[0].id "></pdf>
 
  
  </v-content>
</template>

    <script>
      import Navbar from '@/components/Share/Navbar';
import axios from "@/axios";
import { get,sync,call } from "vuex-pathify";
 import pdf from 'vue-pdf'

export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {pdf,Navbar},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
       url:process.env.VUE_APP_API_URL
    };
  },
  /*-------------------------Run Methods when Start this Page------------------------------------------*/
  async mounted() {
    /**** Call loading methods*/
    
  },
  /*-------------------------Run Methods when Start Routed------------------------------------------*/
  async beforeRouteEnter(to, from, next) {
    next();
  },
  /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
  computed: {
    pigChoose:get('pig/pigChoose'),
    setPigChoose:get('pig/setPigChoose'),
    ...sync('card/*'),
     ...sync('pig/*')
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    ...call('card/*'),
     ...call('pig/*')
   
  }
};
</script>