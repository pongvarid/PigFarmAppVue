
 <template>
  <v-layout row>
    <v-flex xs12>
    
      <v-btn v-if="user.roles[0].id != 3" class="lblue" dark @click="onFeedModal">
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
          <div v-for="wp,i in spitting(brd.pig_weight)">
            <h4 class="nm pdl-10" style="color: green;"><b>น้ำหนักหมูตัวที่ {{i+1}} :</b> {{wp}} กิโลกรัม</h4>
          </div>
        </div>
      </div>
        <h2>รับเลี้ยง</h2>
      <div v-for="brd,index in i_datas">
        <div v-if="brd.feed_type == 1" class="pd-12">
          <div class="card-border shadow-bl violet pd-10">
            <h2 class="blx nm pd-10">
              <v-icon class="blx">mdi-pig</v-icon>
              ไอดีแม่เก่า: {{brd.pig_id_old}}
            </h2>
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่: {{brd.feed_date}}
            </h3>
            <h3 class="nm pdl-10" style="color: #00cc00;">
              <b>จำนวนหมูทั้งหมด : {{brd.pig_count}} ตัว</b> </h3>
            <h3 class="nm pdl-10" style="color: green;"><b>น้ำหนักเฉลี่ย:</b> {{brd.pig_weight_avg}} กิโลกรัม</h3>
       <p class="nm pdl-10">หมายเตุ :
              {{brd.pig_remark}}
            </p>
         
          </div>
        </div>
      </div>

        <h2>ฝากเลี้ยง</h2>
     
        <div v-for="brd,index in i_datas">
        <div v-if="brd.feed_type == 2" class="pd-12">
          <div class="card-border shadow-bl redb pd-10">
            <h2 class="blx nm pd-10">
              <v-icon class="blx">mdi-pig</v-icon>
              ไอดีแม่ใหม่: {{brd.pig_id_new}}
            </h2>
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่: {{brd.feed_date}}
            </h3>
            <h3 class="nm pdl-10" style="color: red;">
              <b>จำนวนหมูทั้งหมด :&nbsp;&nbsp;-{{brd.pig_count}} ตัว</b> </h3>
            <h3 class="nm pdl-10" style="color: green;"><b>น้ำหนักเฉลี่ย:</b> {{brd.pig_weight_avg}} กิโลกรัม</h3>
           <p class="nm pdl-10">หมายเหตุ :
              {{brd.pig_remark}}
            </p>
          
          </div>
        </div>
      </div>
 
    </v-flex>

    <v-dialog
      v-model="dialogFeed"
      scrollable
      persistent
      :overlay="false"
      transition="dialog-transition"
      style="background:white!important;"
    >
      <v-card style="background:white!important;">
        <v-toolbar dark color="ldeep">
          <v-btn icon dark @click.native="offFeedModal()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <h3 class="nm">เพิ่มข้อมูล</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <form
          v-on:submit.prevent="storeFeedData()"
          class="pd-20"
          style="background:white!important;"
        >
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
            <v-text-field slot="activator" v-model="form.feed_date" label="วันที่ผสม" readonly></v-text-field>
            <v-date-picker
              locale="th"
              ref="dateFeed"
              @input="datePigConvert($refs.dateFeed.inputDate)"
            ></v-date-picker>
          </v-menu>

          <div class="box-blueFX mar-top pd-10">
            <v-radio-group v-model="form.feed_type">
              <v-radio key="1" label="รับเลี้ยง +" value="1"></v-radio>
              <v-radio key="2" label="ฝากเลี้ยง -" value="2"></v-radio>
            </v-radio-group>
          </div>
          <div class="box-greenLN mar-top pd-10">
            <v-text-field
              prepend-icon="mdi-calendar"
              v-if="form.feed_type == 1"
              v-model="form.pig_id_old"
              label="ไอดีแม่เก่า"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-calendar"
              v-if="form.feed_type == 2"
              v-model="form.pig_id_new"
              label="ไอดีแม่ใหม่"
            ></v-text-field>

            <v-text-field prepend-icon="mdi-pig" v-model.number="form.pig_count" label="จำนวนลูก"></v-text-field>
            <v-text-field
              prepend-icon="mdi-weight"
              v-model="form.pig_weight_avg"
              label="น้ำหนักเฉลีย"
            ></v-text-field>
            <v-textarea outline v-model="form.pig_remark" label="หมายเหตุ"></v-textarea>
          </div>

          <v-btn color="lok" round class="full-width" dark type="submit">บันทึก</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import { get } from "vuex-pathify";
import { mapGetters, mapActions, mapState } from "vuex";
import _ from "lodash";
export default {
  components: {},
  data() {
    return {
      datas: [],
      i_datas:[],
      dialogFeed: false,
      dialogGravid: false,
      form: {},
      forms: {},
      menu2: false,
      avg: []
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
 
    spitting(tmp) {
        return tmp.split(",");
      },
    countPig() {
      this.form.pig_count =
        this.form.life +
        Number(this.form.dead) +
        Number(this.form.mummy) +
        Number(this.form.deformed);
    },
    //Open Modal method for add data
    onFeedModal() {
      this.dialogFeed = true;
    },
    //Close Modal and reload data
    offFeedModal() {
      this.dialogFeed = false;
      this.defaultForm();
      this.load();
    },
    //getdefault form
    defaultForm() {
      this.form = {};
      this.avg = [];
    },

    storeFeedData: async function() {
      this.form.pig_id = this.cycleChoose.pig_id;
      this.form.pig_cycle_id = this.cycleChoose.id;
      await this.$store.dispatch("feed/storeFeed", this.form);
      this.offFeedModal();
    },

    onUpdateGravidModal(params) {},

    onGravidModal() {},

    offGravidModal() {},

    defaultForm() {
      this.form = {};
    },

    storeGravidData: async function() {},

    reload: async function() {
      let cycle = {
        id: this.cycleChoose.pig_id,
        cycle_id: this.cycleChoose.id
      };
      let ui = await this.$store.dispatch("cycles/findCycle", cycle);
      this.datas = ui[0].birth;
      this.i_datas = ui[0].feed
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
