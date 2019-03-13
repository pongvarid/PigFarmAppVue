<!----------Make By YourName---------------->
 <template>
  <v-content >

  <Navbar/>
      <v-layout column list class="pd-20"> 

    <v-card color="lblue"   class="white--text round shadow-bl">
              <v-layout @click="$router.push('pig/manager')">
                <v-flex xs5> 
                  <v-icon class="fs70 mr-20" dark>mdi mdi-pig</v-icon>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">จัดการแม่พันธุ์</div> 
                         <div>ข้อมูลของแม่พันธุ์</div> 
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout> 
            </v-card>

             <v-card color="lsea"  class="white--text  mrt-20 round shadow-bl">
              <v-layout @click="$router.push('pig/soundcard')">
                <v-flex xs5> 
                  <v-icon class="fs70 mr-20" dark>mdi mdi-account-card-details</v-icon>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">ดูซาวกร์าด</div> 
                         <div>รายระเอียดของแม่พันธุ์</div> 
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout> 
            </v-card>

            <!---- <v-card color="ldeep"  class="white--text  mrt-20 round shadow-bl">
              <v-layout @click="$router.push('pig/vaccine')">
                <v-flex xs5> 
                  <v-icon class="fs70 mr-20" dark>mdi mdi-needle</v-icon>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">วัคซีน</div> 
                       <div>รายระเอียดวัคซีน</div> 
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout> 
            </v-card>
---->
             <v-card color="lnot"  class="white--text  mrt-20 round shadow-bl">
              <v-layout @click="logout()" >
                <v-flex xs5> 
                  <v-icon class="fs70 mr-20" dark>mdi mdi-logout</v-icon>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">ออกจากระบบ</div> 
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout> 
            </v-card>



               
      </v-layout>
    
  </v-content>
</template>

    <script>
    import Navbar from '@/components/Share/Navigation';
    	import { get } from "vuex-pathify"; 
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {Navbar},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {};
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
      user:get('login/user'),
  },
  /*-------------------------Methods------------------------------------------*/
  methods: {
    /******* Methods default run ******/
    load: async function() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log( user);
    },
    logout: async function(){
      await  this.$store.dispatch('login/logout');
            await this.$router.replace({name : 'login'})
    },
  }
};
</script>