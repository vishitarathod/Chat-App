<template>
<div>
  <div class="headind_srch">
            <div class="recent_heading">
              <h4>Chats</h4>
            </div>
          </div>
          
     <div class="inbox_chat">
            <div  v-for="user of users" :key="user._id" class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                 <!-- <button @click.prevent="test"> <h5><router-link :to="{path:`/chatbox/${user._id}`}" >{{user.name}}</router-link> </h5></button> -->
                 <router-link class="router" :to="{name: 'chatbox', params: { id: user._id }}">{{user.name}}</router-link> 
                  <!-- <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p> -->
                </div>
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

<style scoped>
.router{
  font-size: 20px;
  color: #05728f;
  text-decoration: none !important;
}
.recent_heading h4 {
  color: #05728f;
    font-size: 24px;
    margin: auto;
    font-family: inherit;
    font-weight: 700;
}
.recent_heading {float: left; width:40%;}
.inbox_chat { height: 550px; overflow-y: scroll;}
.chat_ib h5 router-link{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}
.chat_img {
  float: left;
  width: 9%;
}

</style>