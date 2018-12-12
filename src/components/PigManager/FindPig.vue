<!----------Make By YourName---------------->
 <template>
  <v-content>
    <v-btn @click="qr()" color="success">QrCode Scan</v-btn>
  
    <v-text-field name="name" label="ค้นหาจากเบอร์ตี" id="id" v-model="pig_id"></v-text-field>
    <v-btn @click="findPig()" color="success">ค้นหา</v-btn>
 
  </v-content>
</template>

    <script>
import axios from "@/axios";
import { get } from "vuex-pathify";
 

export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
      pig_id: null,
      pig:{},
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
    pigChoose:get('pig/pigChoose'),
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    qr: async function() {  
      let pigId = '';
 cordova.plugins.barcodeScanner.scan(
       (result)=> {
       pigId =  result.text; 
     alert('เบอร์ตี : '+ pigId)
    this.getId(pigId);
         /* alert("A barcode has been scanned \n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled); */
                
      }, 
      function (error) {
          alert("Scanning fai led: " + error);
      } 
 );
    }, 

    getId(pigId){
      this.pig_id = pigId;
      this.findPig();
    },

    findPig: async function() { 
      let find = await this.$store.dispatch("pig/findPig", this.pig_id); 
      this.pig_id = '';
    },
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>