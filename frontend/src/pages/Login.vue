<template>
<div class="login-wrapper">
  <div class="login-box">
    <h1 class="heading-center">Login</h1>  
    <form class="lg-form">
  <div class="form-group">
    <label for="phoneNo">Phone Number</label>
    <input type="text" placeholder="Enter phone number" v-model.trim="phoneNo" required>
  </div>
  <div class="form-group">
    <label for="psw">Password</label>
    <input type="password" placeholder="Enter Password" v-model.trim="password" required>
  </div>
  <p class="error" v-if="error!=''">{{error}}</p>
  
  <div class="router">
   <button @click.prevent="login()" class="btn">Login</button>
  </div>
  <router-link to="/forgot" class="forgot-link">forgot password?</router-link>
</form>
  <p class="mt-4">
    Don't have an account? <span><router-link to="/register">Register</router-link></span>
  </p>
</div>
</div>
</template>

<script>
import Vue from 'vue'
import io from 'socket.io-client'
import jwtInterceptor from '../plugins/jwt.interceptor'
export default {
    data(){
        return{
            phoneNo:'',
            password:'',
            error:'',
            socket:io('http://localhost:3000'),
            // msgId:'',
            id:0,
            LoginUserArray:'',
            names:[],
            msgId:''
            // delivered:false
        }
    },
    methods:{
    async login() {
     try {
        const payload = {
        phoneNo:this.phoneNo,
        password: this.password, 
      }
        const response = await jwtInterceptor
        .post("/user/login",payload)
        if(response&&response.data){
          Vue.prototype.$senderId = response.data.userId
          // Vue.prototype.$accessToken=response.data.accessToken
                  this.socket.emit('login',{userId:response.data.userId});
            localStorage.setItem('accessToken',response.data.accessToken)
            // sessionStorage.setItem('isAuthenticated',true)
            this.$router.push('/chat')
        }
      } catch (error) {
        this.error=error
      }
    },
    },
   async mounted(){
       this.socket.on('connected',async(id)=>{
        //  console.log("login",++this.id);
        //  this.LoginUserArray.push(id)
        // this.$store.commit('setLoginUser',this.LoginUserArray)
        // console.log(id);
        // var names=[]
           this.LoginUserArray= JSON.parse(localStorage.getItem('names')) || [];
           this.LoginUserArray.push(id)
           localStorage.setItem("names",JSON.stringify(this.LoginUserArray));

    // var storedNames = JSON.parse(localStorage.getItem("names"));
         this.msgId=id
      //    console.log("login");
       const payload={
          id
        }
        this.$store.dispatch("updateLastSeenToOnline",payload)
        })

       this.socket.on('disconnected',async(recId)=>{
            //  console.log(this.msgId);
            //  console.log("recId",recId);
            console.log("disconnecxted");
            console.log(this.msgId);
            console.log(recId);
            //  if(this.msgId==recId){
               var index = this.LoginUserArray.indexOf(recId);
                if (index > -1) {
                  console.log("hello");
                    this.LoginUserArray.splice(index, 1);
                    console.log(this.LoginUserArray);
                     localStorage.setItem("names",JSON.stringify(this.LoginUserArray))
                }
            //  }
           })

      //  await this.socket.on('disconnected',async(id)=>{
      //  const payload={
      //     users:this.users,
      //     id:id
      //   }
      //  await this.$store.dispatch("updateLastSeen",payload)
      //   })
    }
}
</script>

<style>
.login-wrapper{min-height: calc(100vh - 62px); display: flex; align-items: center; justify-content: center;}
.login-box{display: flex; flex-direction: column; max-width: 300px; width: 100%; align-items: center;}
.login-box .lg-form{width: 100%; max-width: 100%55555555;}
.login-box>h1{font-size: 28px; margin-bottom: 24px; line-height: 34px; font-weight: 500;}
.form-group{display: flex; width:100%; flex-direction: column; margin-bottom: 10px;}
.form-group>label{font-size: 16px; line-height: 20px; color: #666666; margin-bottom: 0; font-weight: 400;}
.form-group input{outline: none; border: 1px solid #c4c4c4; padding: 5px 10px; border-radius: 8px;}
.form-group input::placeholder{font-size: 12px; line-height: 14px; color: #bcbdbd;}
.login-box .btn{border: 0; width: 100%; background-color: #007bff; color: #ffffff;}
.forgot-link{margin-left: auto; display: block; text-align: right;}
</style>