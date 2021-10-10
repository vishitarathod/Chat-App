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
                 <!-- <p v-if="user.lastseen=='online'">{{user.lastseen}} </p>  -->
                  <p>Last seen {{user.lastseen}} </p>
                </div>
              </div>
            </div>
     </div>
</div>
</template>

<script>
import io from 'socket.io-client'
import jwtInterceptor from '../../plugins/jwt.interceptor'
export default {
    //  props:[],
    data(){
   
        return{
            users:[],
            socket:io('http://localhost:3000'),
            offline:'',
            name:''
        }
    },
   async created(){
        try {
        let apiURL ="/chat/all-user";
       const senderId=this.$senderId
       const response=await jwtInterceptor.post(apiURL,{senderId})
      //  console.log(response.data)
       this.users=response.data
      //  console.log('get usersssssssssss',this.users);
        } catch (error) {
            console.log(error);
        }
    },
    methods:{
   
      
    },

   async mounted(){
      //      this.socket.on('connected',(id)=>{
      //           console.log("msg",id)
      //   // this.updateLastSeen(id)
      //  const payload={
      //     users:this.users,
      //     id:id
      //   }
      //   this.$store.dispatch("updateLastSeenToOnline",payload)
      //   }) 
      
    //  await this.$store.commit('setUsers',this.users)
    //  console.log(await this.$store.state.users);
      const users=await this.$store.getters.getUpdateLastSeenToOnline
      console.log("uuuuuuuuuuuuuuuuuuuuuu",users);
      this.users=users
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