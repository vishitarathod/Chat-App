<template>
  <div>
    <h1 class="heading-center">Login</h1>  
    <form class="lg-form">
  <div>
    <label for="phoneNo"><b>Phone Number</b></label>
    <input type="text" placeholder="Enter phone number" v-model.trim="phoneNo" required>
  </div>
  <div>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" v-model.trim="password" required>
  </div>
  <p class="error" v-if="error!=''">{{error}}</p>
  
  <div class="router">
   <button @click.prevent="login()">Login</button>
  </div>
  <div class="container">
    <p> <router-link to="/forgot">forgot password?</router-link></p>
  </div>
</form>
  <p>
    Don't have an account? <span><router-link to="/register">Register</router-link></span>
  </p>
</div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
    data(){
        return{
            phoneNo:'',
            password:'',
            error:''
        }
    },
    methods:{
    async login() {
    //  this.$store.commit('setLoading',true)
     try {
        const payload = {
        phoneNo:this.phoneNo,
        password: this.password, 
      }
        const response = await axios
        .post("http://localhost:3000/user/login",payload)
        console.log(response.data)
        if(response&&response.data){
          Vue.prototype.$senderId = response.data
            // sessionStorage.setItem('senderId',response.data)
            // sessionStorage.setItem('isAuthenticated',true)
            this.$router.push('/chat')
        }
      } catch (error) {
        this.error=error.response.data.message
      }
    },
    }
}
</script>
<style>
/* form.lg-form {
  margin: 16px;
  padding: 32px;
  border: 4px solid #d1d5db;
  min-width: 400px;
  border-radius: 16px;
}
.error{
  color: red;
  padding: 15px 0px;
}
.lg-form label,
.lg-form input {
  display: block;
  min-width: 100%;
  margin: 8px 0px;
}

.lg-form label {
  font-weight: bold;
}
.lg-form input {
  height: 34px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 1rem;
  background-color: #f3f4f6;
}
input:focus {
  outline: none;
  background-color: #fff;
  border: 2px solid #f3f4f6;
}

button{
  background-color: #0892d0;
  border-radius: 8px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.heading-center{
  text-align: center;
} */
</style>