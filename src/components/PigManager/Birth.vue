
 <template>
  <v-layout row>
    <v-flex xs12>
    
      <v-btn v-if="user.roles[0].id != 3" class="lblue" dark @click="onBirthModal">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล
      </v-btn> 
      <div v-for="brd in datas" class="pd-12">
       <div class="card-border shadow-bl violet pd-10">
          <h3 class="blx nm pd-10">
            <v-icon class="blx">mdi-calendar</v-icon>
            วันที่คลอด: {{brd.birth_date}}
          </h3>
          <h3 class="nm pdl-10" style="color: #00cc00;">
            <b>จำนวนหมูที่รอดชีวิต : {{brd.life}} ตัว</b> </h3>
          <h4 class="nm pdl-10" style="color:blue;">
            จำนวนหมูทั้งหมด : {{brd.pig_count}} ตัว</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">ตาย : {{brd.dead}} ตัว</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">มัมมี่ : {{brd.mummy}} ตัว</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">พิการ : {{brd.deformed}} ตัว</h4>
          <h3 class="nm pdl-10" style="color: #00cc00;">น้ำหนักเฉลี่ย{{brd.pig_weight_avg}} กิโลกรัม </h3>
       </div>
      </div>
         <Vaccine :id="cycleChoose.pig_id" :cycle="cycleChoose.id" :cycle_type="2" />
    </v-flex>

    <v-dialog
      v-model="dialogBirth"
      scrollable
      persistent
      :overlay="false"
      transition="dialog-transition"
      style="background:white!important;"
    >
      <v-card  style="background:white!important;"> 
        <v-toolbar dark color="ldeep">
          <v-btn icon dark @click.native="offBirthModal()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <h3 class="nm">เพิ่มข้อมูล</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <form v-on:submit.prevent="storeBirthData()" class="pd-20"  style="background:white!important;"> 
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
              v-model="form.birth_date"
              label="วันที่ผสม" 
              readonly
            ></v-text-field>
            <v-date-picker locale="th" ref="dateBirth" @input="datePigConvert($refs.dateBirth.inputDate)"></v-date-picker> 
          </v-menu> 
             <v-text-field @input="countPig()"  type="number"  v-model.number="form.life" label="มีชีวิต"></v-text-field>
             <div v-for="num,index in form.life" class="lok">
                    <v-text-field type="number" v-model.number="avg[index]" @input="avgCount()" :label="'หมูตัวที่ '+ (index+1)"></v-text-field>
             </div>
              <v-text-field @input="countPig()"  type="number"  v-model.number="form.dead" label="ตาย"></v-text-field>
              <v-text-field @input="countPig()"   type="number" v-model.number="form.mummy" label="มัมมี่"></v-text-field>
              <v-text-field @input="countPig()"    type="number" v-model.number="form.deformed" label="พิการ"></v-text-field>
            
          <v-text-field  type="number" v-model.number="form.pig_count" label="จำนวนหมูทั้งหมด" readonly></v-text-field>
          <v-text-field v-model.number="form.pig_weight_avg" label="น้ำหนักเฉลี่ย" readonly></v-text-field>

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
      dialogBirth: false,
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
       this.form.birth_date = this.thai(refDate);
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
    onBirthModal() {
      this.dialogBirth = true;
    },
    //Close Modal and reload data
    offBirthModal() {
      this.dialogBirth = false;
      this.defaultForm();
      this.load();
    },
    //getdefault form
    defaultForm() {
      this.form= {};
      this.avg = [];
    },

    storeBirthData: async function() {
           this.form.pig_id = this.cycleChoose.pig_id;
        this.form.pig_cycle_id = this.cycleChoose.id;
         await this.$store.dispatch("birth/storeBirth", this.form);
         this.offBirthModal();
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
      this.datas = ui[0].birth; 
    },
    load: async function() {
      this.reload();
      this.datas = this.cycleChoose.birth;
    }
  },
  mounted() {
    this.load();
  }
};
</script>
