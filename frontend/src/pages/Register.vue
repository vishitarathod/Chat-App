<template>
  <div>
    <h1 class="heading-center">Register</h1>
     <form class="lg-form">
    <label for="name"><b>Name</b></label>
    <input type="text"  placeholder="Enter name" v-model.trim="name" required>

    <label for="age"><b>Age</b></label>
    <input type="text" placeholder="Enter Age" v-model.trim="age" required>

    <label for="phoneNo"><b>Phone Number</b></label>
    <input type="text" placeholder="Enter phone number" v-model.trim="phoneNo" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" v-model.trim="password" required>

    <p class="error" v-if="error!=''">{{error}}</p>
  <div>
      <button type="button" @click.prevent="register()">Register</button>
  </div>
    </form>
</div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            name:'',
            age:'',
            phoneNo:'',
            password:'',
            error:''
        }
    },
    methods:{
    async register() {
    //  this.$store.commit('setLoading',true)
     try {
        const payload = {
        name:this.name,
        age: this.age,
        phoneNo:this.phoneNo,
        password: this.password, 
      }
        const response = await axios
        .post("http://localhost:3000/user/register",payload)
        if(response&&response.data){
            this.$router.push('/login')
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