<template>
  <div class="register-wrapper">
    <div class="register-box">
    <h1 class="heading-center">Register</h1>
     <form class="lg-form">
    <div class="form-group">
    <label for="name"><b>Name</b></label>
    <input type="text"  placeholder="Enter name" v-model.trim="name" required>
    </div>
     <div class="form-group">
    <label for="age"><b>Age</b></label>
    <input type="text" placeholder="Enter Age" v-model.trim="age" required>
     </div>
      <div class="form-group">
    <label for="phoneNo"><b>Phone Number</b></label>
    <input type="text" placeholder="Enter phone number" v-model.trim="phoneNo" required>
      </div>
       <div class="form-group">
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" v-model.trim="password" required>
       </div>
    <p class="error" v-if="error!=''">{{error}}</p>
  <div>
      <button type="button" class="btn" @click.prevent="register()">Register</button>
  </div>
    </form>
    </div>
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
.register-wrapper{min-height: calc(100vh - 62px); display: flex; align-items: center; justify-content: center;}
.register-box{display: flex; flex-direction: column; max-width: 300px; width: 100%; align-items: center;}
.register-box .lg-form{width: 100%; max-width: 100%55555555;}
.register-box>h1{font-size: 28px; margin-bottom: 24px; line-height: 34px; font-weight: 500;}
.form-group{display: flex; width:100%; flex-direction: column; margin-bottom: 10px;}
.form-group>label{font-size: 16px; line-height: 20px; color: #666666; margin-bottom: 0; font-weight: 400;}
.form-group input{outline: none; border: 1px solid #c4c4c4; padding: 5px 10px; border-radius: 8px;}
.form-group input::placeholder{font-size: 12px; line-height: 14px; color: #bcbdbd;}
.register-box .btn{border: 0; width: 100%; background-color: #007bff; color: #ffffff;}
.forgot-link{margin-left: auto; display: block; text-align: right;}
</style>