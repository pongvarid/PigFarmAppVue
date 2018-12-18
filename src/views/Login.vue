<!----------Make By YourName---------------->
 <template>
  <v-content class="bg">
      <v-container fluid fill-height class="login">
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4>
            <v-card   class="login"  > 
              <v-card-text>
                  <center>
                      <h1 color="primary"><v-icon color="blue" class="fs108">mdi mdi-pig</v-icon></h1>
                      <h1 class="fs36 nm">Pig Farm</h1>
                      <span class="fs16">Mobile application for manager.</span>
                  </center><br>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="form.email" name="login" label="Username" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="form.password"  name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login()" color="ldeep" class="full-width" dark round large> <h2>Login</h2></v-btn>
              </v-card-actions>
               <v-flex xs12 class="pd-12">
            alpha version 0.2
          </v-flex>
            </v-card>
          </v-flex>
         
        </v-layout>
      </v-container>
    </v-content>
</template>

    <script>
export default {
  name: "Root",
  /*-------------------------Load Component---------------------------------------*/
  components: {},
  /*-------------------------Set Component---------------------------------------*/
  props: {},
  /*-------------------------DataVarible---------------------------------------*/
  data() {
    return {
        form:{},
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
  computed: {},
  /*-------------------------Methods------------------------------------------*/
  methods: {
    login:async function(){
      let login = await this.$store.dispatch('login/login',this.form);
      if(login){
        await this.$router.replace({name : 'home'})
        location.reload();
      }else{
        this.$store.dispatch('alert/error','Username or Password is incorrect.');
      }
  //   
   
    },
    /******* Methods default run ******/
    load: async function() {}
  }
};
</script>

<style scoped>
.bg{
  background:white;
}
  .login{
    border:none!important;
     box-shadow:none!important;
  }
</style>
