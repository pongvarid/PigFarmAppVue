
 <template>
  <v-layout row>
    <v-flex xs12>
    
      <v-btn v-if="user.roles[0].id != 3" class="lblue" dark @click="onFeedoutModal">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล
      </v-btn> 
      <div v-for="brd in datas" class="pd-12">
       <div class="card-border shadow-bl violet pd-10">
<h3 class="blx nm pd-10">
            <v-icon class="blx">mdi-calendar</v-icon>
            วันที่: {{brd.feed_date}}
          </h3>
          <h3 class="nm pdl-10" style="color: red;">
            <b>จำนวนหมูทั้งหมด :&nbsp; -{{brd.pig_count}} ตัว</b> </h3>
          <h3 class="nm pdl-10" style="color: red;"><b>สาเหตุ:</b> {{brd.feed_type}} </h3>
        
       </div>
      </div>
         <Vaccine :id="cycleChoose.pig_id" :cycle="cycleChoose.id" :cycle_type="3" />
    </v-flex>

    <v-dialog
      v-model="dialogFeedout"
      scrollable
      persistent
      :overlay="false"
      transition="dialog-transition"
      style="background:white!important;"
    >
      <v-card  style="background:white!important;"> 
        <v-toolbar dark color="ldeep">
          <v-btn icon dark @click.native="offFeedoutModal()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <h3 class="nm">เพิ่มข้อมูล</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <form v-on:submit.prevent="storeFeedoutData()" class="pd-20"  style="background:white!important;"> 
          <v-menu
            :close-on-content-click="false" 
            :nudge-right="40"
            lazy
            v-model="menu2"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="form.feed_date"
              label="วันที่ผสม" 
              readonly
            ></v-text-field>
            <v-date-picker locale="th" ref="dateFeedout" @input="datePigConvert($refs.dateFeedout.inputDate)"></v-date-picker> 
          </v-menu> 
             
                <div class="box-red mar-top pd-20">
                <h3><v-icon>mdi-heart-off</v-icon>สาเหตุ</h3>
                <v-radio-group v-model="form.feed_type">
                  <v-radio key="1" label="ตาย" value="ตาย"></v-radio>
                  <v-radio key="2" label="พิการ" value="พิการ"></v-radio>
                  <v-radio key="3" label="คัดทิ้ง" value="คัดทิ้ง"></v-radio>
                </v-radio-group>
              </div>
              <v-text-field class="box-greenFX mar-top pd-20"   prepend-icon="mdi-pig" v-model.number="form.pig_count" label="จำนวนลูก"></v-text-field>
     
          <v-btn color="lok" round class="full-width " dark  type="submit">บันทึก</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import { get } from "vuex-pathify";
import { mapGetters, mapActions, mapState } from "vuex";
import _ from 'lodash';
import Vaccine from './Vaccine';
export default {
  components: {Vaccine},
  data() {
    return {
      datas: [],
      dialogFeedout: false,
      dialogGravid: false,
      form: {},
      forms: {},
      menu2:false,
      avg:[],
    };
  },
  props: {
    id: null,
    cycle: null
  },
  computed: {
    cycleChoose: get("cycles/cycleChoose"),
    format: get("alert/format"),
    thai: get("alert/thai"),
      user:get('login/user'),
  },
  methods: {
    //Convert Date
    datePigConvert(refDate) {
       this.form.feed_date = this.thai(refDate);
      this.menu2 = false; 
    
    },
    avgCount(){
      this.form.pig_weight = this.avg.toString(); 
      let sum = _.sum(this.avg);
      let avg = sum/this.avg.length;
      this.form.pig_weight_avg = avg.toFixed(2); 
    },
    countPig(){
      this.form.pig_count = this.form.life + Number(this.form.dead) + Number(this.form.mummy) + Number(this.form.deformed);
    },
    //Open Modal method for add data
    onFeedoutModal() {
      this.dialogFeedout = true;
    },
    //Close Modal and reload data
    offFeedoutModal() {
      this.dialogFeedout = false;
      this.defaultForm();
      this.load();
    },
    //getdefault form
    defaultForm() {
      this.form= {};
      this.avg = [];
    },

    storeFeedoutData: async function() {
        this.form.feed_why_type = 0;
           this.form.pig_id = this.cycleChoose.pig_id;
        this.form.pig_cycle_id = this.cycleChoose.id;
         await this.$store.dispatch("feedout/storeFeedout", this.form);
         this.offFeedoutModal();
    },

    onUpdateGravidModal(params) {},

    onGravidModal() {},

    offGravidModal() {},

    defaultForm() {
      this.form= {}
    },

    storeGravidData: async function() {},

    reload: async function() {
      let cycle = {
        id: this.cycleChoose.pig_id,
        cycle_id: this.cycleChoose.id
      };
     let ui =  await this.$store.dispatch("cycles/findCycle", cycle);
      this.datas = ui[0].feedout; 
    },
    load: async function() {
      this.reload();
      this.datas = this.cycleChoose.feedout;
    }
  },
  mounted() {
    this.load();
  }
};
</script>
