<!----------Make By YourName---------------->
 <template>
  <v-content>

  <Navbar/>
      <v-layout column list>
            <v-btn color="success" @click="$router.push('pig/manager')">จัดการแม่พันธุ์หมู</v-btn>
         <v-btn color="success">ดูซาวกร์าด</v-btn>
            <v-btn color="success">วัคซีน</v-btn>
               <v-btn @click="logout()" color="success">ออกจากระบบ</v-btn>
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