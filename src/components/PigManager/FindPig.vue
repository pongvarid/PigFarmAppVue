<!----------Make By YourName---------------->
 <template>
  <v-content>
    <center>
      <br>
      <v-btn @click="qr()" class="wd120 hg120 shadow-bl"  color="lok" icon dark >
        <v-icon class="fs60">mdi-qrcode-scan</v-icon>
      </v-btn>
    </center>
  <div class="mr-40">
    <v-form @submit.prevent="findPig()">
        <v-text-field class="fs20" name="name" label="ค้นหาจากเบอร์ตี" id="id" v-model="pig_id"></v-text-field>
    <v-btn round  type="submit" color="lsea" class="full-width" dark>
      <v-icon>mdi-feature-search</v-icon>
  <b>ค้นหา</b></v-btn>
    </v-form>


  </div>
  
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
      pig:{
        data:{
          length:0
        }
      },
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
    setPigChoose:get('pig/setPigChoose'),
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
      if(this.pig_id){
      let find = await this.$store.dispatch("pig/findPig", this.pig_id); 
      this.pig_id = '';
      this.pig = find;    
            console.log('PigFindSize',find.data.length);
            if(Number(find.data.length) > 0){
              this.setPigChoose(find);
              this.$store.dispatch('alert/havePig','พบหมูแล้ว')
             await this.$router.push('/pig/cycles');
           
            }else{
              this.$store.dispatch('alert/error','ไม่พบหมู')
            }
      }
      else{
        alert('กรุณาระบุข้อมูล');
      }
    },
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>