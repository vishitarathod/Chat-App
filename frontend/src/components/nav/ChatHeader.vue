<template>
     <div class="inbox_chat">
            <div  v-for="user of users" :key="user._id" class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                 <!-- <button @click.prevent="test"> <h5><router-link :to="{path:`/chatbox/${user._id}`}" >{{user.name}}</router-link> </h5></button> -->
                 <h5><router-link :to="{path:`/chatbox/${user._id}`}" >{{user.name}}</router-link> </h5>
                  <!-- <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p> -->
                </div>
              </div>
            </div>
     </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            users:[]
        }
    },
   async created(){
        try {
        let apiURL ="http://localhost:3000/chat/all-user";
       const senderId=this.$senderId
       const response=await axios.post(apiURL,{senderId})
       console.log(response.data)
       this.users=response.data
        } catch (error) {
            console.log(error);
        }
    },
    methods:{
      test(){
        console.log("object11");
      }
    }
}
</script>