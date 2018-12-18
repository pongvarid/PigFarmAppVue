
 <template>
  <v-layout row>
    <v-flex xs12>
   
      <v-btn v-if="user.roles[0].id != 3" class="lblue" dark @click="onBreederModal">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล
      </v-btn> 
      <div v-for="bd,index in datas" class="pd-12">
        <div class="card-border full-width shadow-bl pd-10">
          <h3 class="blx nm pd-10">
            <v-icon class="blx">mdi-calendar</v-icon>
            วันที่ผสมพันธ์ุ : {{bd.breed_date}}
          </h3>
          <h4 class="nm pdl-10" style="color: #B03060;">ชุดการผสม : {{bd.breed_week}}</h4>
          <h4 class="nm pdl-10" style="color: #00cc00;">วันที่คาดว่าจะคลอด : {{bd.delivery_date}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">พ่อพันธ์ตัวที่ 1 : {{bd.breeder_a}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">พ่อพันธ์ตัวที่ 2 : {{bd.breeder_b}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">พ่อพันธ์ตัวที่ 3 : {{bd.breeder_c}}</h4>
       <!----   <h3 style="color:green;">--------------------------------------------------------</h3>
          <div v-if="bd.gravid != 0">
            <h4 class="nm pdl-10" style="color:green;">สถานะ : ติดลูกแล้ว</h4>

            <div class="nm pdl-10" v-if="bd.gravid == 3" style="color:green">ลัษณะการติดลูก : ปกติ</div>
            <h4 class="nm pdl-10" style="color:brown;">วันที่ติดลูก : {{bd.gravid_date}}</h4>
            <p class="nm pdl-10" style="color:brown;">หมายเหตุ : {{bd.gravid_remark}}</p>
            <div class="nm pdl-10" v-if="bd.gravid == 1" style="color:red">ลักษณะการติดลูก : แท้ง
              <h4>วันที่แท้งลูก : {{ bd.gravid_out }}</h4>
              <p style="color:brown;">หมายเหตุ : {{bd.gravid_out_remark}}</p>
            </div>

            <v-btn
              v-if="bd.gravid == 3"
              @click="gravidOpen(bd.id,bd.gravid,bd.gravid_date,1)"
              class="box-red"
              dark
            >
              <v-icon>mdi-robot</v-icon>&nbsp;แท้ง
            </v-btn>
          </div>
          <div v-if="bd.gravid == 0">
            <h4 class="nm pdl-10" style="color:red;">สถานะ : ยังไม่ติดลูก</h4>
            <v-btn
              v-if="bd.gravid == 0"
              @click="gravidOpen(bd.id,bd.gravid,bd.gravid_date,0)"
              class="box-blue"
              dark
            >
              <v-icon>mdi-robot</v-icon>&nbsp;ติดลูก
            </v-btn>
          </div>---->
        </div>  
      </div>
          <Vaccine :id="cycleChoose.pig_id" :cycle="cycleChoose.id" :cycle_type="1" />
    </v-flex>



    <v-dialog
      v-model="dialogBreeder"
      scrollable
      persistent
      :overlay="false"
      transition="dialog-transition"
      style="background:white!important;"
    >
      <v-card  style="background:white!important;"> 
        <v-toolbar dark color="ldeep">
          <v-btn icon dark @click.native="offBreederModal()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <h3 class="nm">เพิ่มข้อมูล</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
     
        <form v-on:submit.prevent="storeBreederData()" class="pd-20"  style="background:white!important;"> 
         
          <v-menu
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="form.breed_date"
              label="วันที่ผสม" 
              readonly
            ></v-text-field>
            <v-date-picker locale="th" ref="breedDate"   @input="datePigConvert($refs.breedDate.inputDate)"></v-date-picker>
          </v-menu>
 
          <v-text-field
            name="name"
            label="วันที่คาดว่าจะคลอด"
            v-model="form.delivery_date"
            id="id"
            required
          ></v-text-field>

        <v-text-field
                v-model="form.breed_week"
            name="name"
            label="ชุดผสม"
            id="id"
        ></v-text-field>

         <v-text-field   label="พ่อพันธ์ุตัวที่ 1" v-model="form.breeder_a"></v-text-field>
                <v-text-field   label="พ่อพันธ์ุตัวที่ 2" v-model="form.breeder_b"></v-text-field>
                <v-text-field  label="พ่อพันธ์ุตัวที่ 3" v-model="form.breeder_c"></v-text-field>

          <v-btn color="lok" round class="full-width " dark  type="submit">บันทึก</v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import { get } from "vuex-pathify";
import Vaccine from './Vaccine';
export default {
  components: {Vaccine},
  data() {
    return {
      datas: [],
      dialogBreeder: false,
      dialogGravid: false,
      form: {},
      forms: {},
      menu2:false,
      id:0,
      cycle:0,
    };
  },
  props: {
 
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
        console.log(refDate)
        this.menu2 = false; 
      let date = moment(refDate).add(116, "days");
      this.form.delivery_date = this.thai(date);
     this.form.breed_date = this.thai(refDate);
    },
    //Open Modal method for set data when update
    onUpdateBreederModal(params) {},
    //Open Modal method for add data
    onBreederModal() {
      this.dialogBreeder = true;
    },
    //Close Modal and reload data
    offBreederModal() {
      this.dialogBreeder = false;
      this.defaultForm();
      this.load();
    },
    //getdefault form
    defaultForm() {
      this.form= {};
    },

    storeBreederData: async function() {
           this.form.pig_id = this.cycleChoose.pig_id;
        this.form.pig_cycle_id = this.cycleChoose.id;
         await this.$store.dispatch("breeder/storeBreeder", this.form);
         this.offBreederModal();
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
    
      this.datas = ui[0].breeders; 
    },
    load: async function() {
      this.reload();
      this.datas = this.cycleChoose.breeders;
    }
  },
  mounted() {
    this.load();
  }
};
</script>
