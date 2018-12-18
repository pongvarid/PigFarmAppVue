<!----------Make By YourName---------------->
 <template>
<div>
    <h2>ข้อมูลยาและวัคซีน</h2> 
      <v-btn v-if="user.roles[0].id != 3" class="lblue" dark @click="onModal()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล
      </v-btn> 

    <div v-for="vd in datas">
        <div v-if="vd.cycle_type == cycle_type" class="pd-12">
          <div class="card-border shadow-bl violet pd-10">
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่ใช้: {{vd.date}}
            </h3>
            <h3 class="nm pdl-10" style="color: brown;">
              ประเภท : {{vd.name}}</h3>
            <h3 class="nm pdl-10" style="color: brown;">
              <div v-if="vd.display.display_name != null">
                ชื่อ : {{ vd.display.display_name }}
              </div>
              <div v-if="vd.display.display_name == null">
                ชื่อ : {{ vd.display }}
              </div>
            </h3>
            <h3 class="nm pdl-10" style="color: brown;">
              ราคา : {{vd.cost}}</h3>
          </div>
        </div>
      </div>

<v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-toolbar dark color="box-purple">
          <v-btn icon dark @click.native="offModal()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <h3 class="nm">เพิ่มข้อมูล</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card class="container" row wrap>

 <form v-on:submit.prevent="storeData()" class="pd-20"  style="background:white!important;"> 
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
              v-model="form.date"
              label="วันที่ผสม" 
              readonly
            ></v-text-field>
            <v-date-picker locale="th" ref="dateBirth" @input="datePigConvert($refs.dateBirth.inputDate)"></v-date-picker> 
          </v-menu> 

          <v-radio-group  v-model="form.name">
            <v-radio key="1" label="วัคซีน" value="VACCINE"></v-radio>
            <v-radio key="2" label="ยา" value="MEDICINE"></v-radio>
          </v-radio-group> 
          <v-select v-if="form.name=='VACCINE'" prepend-icon="mdi-needle"  v-model="form.display"   :items="vaccine" item-text="display_name" item-value="display_name" label="Select vaccine" persistent-hint single-line></v-select>
          <v-select v-if="form.name=='MEDICINE'" prepend-icon="mdi-flask-outline" v-model="form.display"   :items="medicine" item-text="display_name" item-value="display_name" label="Select medicine"  persistent-hint single-line></v-select>
          <v-text-field v-model="form.cost" prepend-icon="mdi-bitcoin" label="ราคา"></v-text-field>
          
          <v-btn color="lok" round class="full-width" dark type="submit">บันทึก</v-btn>
 </form>
       
        </v-card>
      </v-card>
    </v-dialog>
</div>
</template>

    <script>
    	import { get } from "vuex-pathify"; 
export default {
    name: 'Root',
    /*-------------------------Load Component---------------------------------------*/
    components: {

    },
  /*-------------------------Set Component---------------------------------------*/
props:{
       id: null,
      cycle: null,
      cycle_type: null
},
    /*-------------------------DataVarible---------------------------------------*/
    data() {
    return {
        menu2:false,
        datas:[],
        dialog:false,
        form:{},
        type:null,
        };
    }, 
    /*-------------------------Run Methods when Start this Page------------------------------------------*/
     async mounted() {
    /**** Call loading methods*/
            this.load(); 
    },
    /*-------------------------Run Methods when Start Routed------------------------------------------*/
     async beforeRouteEnter(to, from, next) { 
        next()
    },
    /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
    computed:{
        vaccine:get('vaccine/vaccine'),
         medicine:get('vaccine/medicine'),
         cycleChoose: get("cycles/cycleChoose"),
         choose: get("cycles/choose"),
    format: get("alert/format"),
    thai: get("alert/thai"),
      user:get('login/user'),

},
    /*-------------------------Methods------------------------------------------*/
methods:{
    datePigConvert(refDate) {
       this.form.date = this.thai(refDate);
      this.menu2 = false; 
    
    },

     //Open Modal method for set data when update
     onUpdateModal(params) { 
    
    },
    //Open Modal method for add data
    onModal() {
    this.dialog = true;
    },
    //Close Modal and reload data
    offModal() {
        this.dialog = false;
        this.defaultForm();
        this.load();

    }, 
    //getdefault form
    defaultForm() {
        this.form = {};
    },
    //Store data to vuex --post
     storeData: async function () {
             this.form.pig_id = this.cycleChoose.pig_id;
        this.form.pig_cycle_id = this.cycleChoose.id;
         this.form.cycle_type = this.cycle_type;

         this.$store.dispatch('vaccine/storeVaccine',this.form);
         this.offModal();
    },

    reload: async function() {
     let cycle = {
        id: this.cycleChoose.pig_id,
        cycle_id: this.cycleChoose.id
      };
     let ui = await  this.$store.dispatch("cycles/findVaccine", cycle);

      this.datas = ui.cycles[this.choose].vaccine; 
      console.log('vaccine',this.datas);
    },
    /******* Methods default run ******/
    load:async function(){
        this.reload();
    }
},
    }
</script>