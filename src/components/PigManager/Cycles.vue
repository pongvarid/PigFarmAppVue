<!----------Make By YourName---------------->
 <template>
  <v-content> 
    <v-layout row wrap class="pd-20">
      <v-card class="full-width shadow-bl pd-10">
          <h1>ข้อมูลแม่พันธุ์</h1><hr  style="border-color:red;" ><br>
          <h2>เบอร์ตี {{pig.pig_id}}</h2>
          <h4>เบอร์หู {{pig.pig_number}}</h4>
          <h5>สถานะ {{pig.status.display_name}}</h5>
      </v-card>
    </v-layout>
    <v-layout row wrap  class="pd-20">
        <h1>ข้อมูลลำดับทัอง</h1> 
     <center> <v-btn v-if="user.roles[0].id != 3" color="lhead" class="" @click="newCycle" large round dark>  <v-icon>mdi-plus-circle</v-icon>เพิ่มลำดับท้องใหม่</v-btn> </center>
    </v-layout>
    <v-layout row wrap v-for="cycle,index in cycles" class="pdl-20 pdr-20 pdt-10"> 
      <v-card class="full-width shadow-bl pd-10">
              <v-card-title primary-title>
                <div>
                  <div class="headline f"><b>ลำดับท้องที่</b> {{cycle.cycle_sequence}}</div>
                  <span><b>สร้าง&nbsp;</b>{{cycle.created_at}}</span><br>
                     <span><b>แก้ไขล่าสุด&nbsp;</b> {{cycle.updated_at}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat class="lok" dark @click="chooseCycle(cycle,index)">ดูข้อมูล</v-btn>
              </v-card-actions>
            </v-card> 
    </v-layout>

     <br><br><br>
  </v-content>
</template>

    <script>
import { get } from "vuex-pathify"; 
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {
     
  },
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
      cycles: [],
      pig:{
          status:'',
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
    pigChoose: get("pig/pigChoose"),
    setCycleChoose:get('cycles/setCycleChoose'),
    setChoose:get('cycles/setChoose'),
      user:get('login/user'),
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {

    chooseCycle:async function(cycle,index){
        this.setCycleChoose(cycle);
        this.setChoose(index);
        await this.$router.push('/pig/cycles/detail');
    },
    
    newCycle: async function () {
                if (confirm("คุณแน่ใจหรือไม่ ว่าต้องการเพิ่มลำดับการคลอดใหม่")) {
                    let cycle = await this.$store.dispatch( "pig/createCycle", this.pig.id );
                    console.log("CYCLE", cycle); 
                    this.reFoundPig();
                }
    },
 
    reFoundPig: async function(){
         let find = await this.$store.dispatch("pig/findPig", this.pig.pig_id); 
         this.load();
    },
    /******* Methods default run ******/
    load: async function() {
    this.pig = this.pigChoose.data[0]; 
      this.cycles = this.pigChoose.data[0].cycles; 
      console.log(JSON.parse(JSON.stringify(this.pig)))

    }
  }
};
</script>