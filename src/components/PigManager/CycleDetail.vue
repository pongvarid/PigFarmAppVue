<!----------Make By YourName---------------->
 <template>
  <v-content>
    <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
      <v-tab  key="0" ripple>การผสม</v-tab>
      <v-tab  key="1" ripple>การคลอด</v-tab>
      <v-tab  key="2" ripple>การเลี้ยงลูก</v-tab>
      <v-tab  key="3" ripple>การอย่านม</v-tab>

      <v-tab-item  key="0">
        <v-card flat>
          <h2>ข้อมูลการผสมพันธุ์</h2>
         <Breeder @reload="load()"/>
        </v-card>
      </v-tab-item>

      <v-tab-item  key="1">
        <v-card flat>
            <h2>ข้อมูลการคลอด</h2>
          <Birth @reload="load()"/>
        </v-card>
      </v-tab-item>

      <v-tab-item  key="2">
        <v-card flat>
            <h2>ข้อมูลการเลี้ยงลูก</h2> 
           <Feed/>
           <h2>จำหน่ายออก</h2>
           <Feedout/>
        </v-card>
      </v-tab-item>

      <v-tab-item  key="3">
        <v-card flat>
            <h2>ข้อมูลการหย่านม</h2> 
         <Milk/>
        </v-card>
      </v-tab-item>

    </v-tabs>
    <br><br><br>
  </v-content>
</template>

    <script>
import { get } from "vuex-pathify";
import Breeder from './Breeder';
import Birth from './Birth';
import Feed from './Feed';
import Feedout from './Feedout';
import Milk from './Milk';
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {Breeder,Birth,Feed,Feedout,Milk},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
      active:null,
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
    cycleChoose: get("cycles/cycleChoose"),
      user:get('login/user'),
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    loadCycle() {
      let cycle = {
        id: this.cycleChoose.pig_id,
        cycle_id: this.cycleChoose.id
      };
      this.$store.dispatch("cycles/findCycle", cycle);
    },
    /******* Methods default run ******/
    load: async function() {
      this.loadCycle();
      this.$store.dispatch('vaccine/getVaccine');
      this.$store.dispatch('vaccine/getMecicine');
    }
  }
};
</script>