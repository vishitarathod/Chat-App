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
            socket:'',
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
       console.log('get usersssssssssss',this.users);

        this.socket=io('http://localhost:3000')
        this.socket.on('connected',(message)=>{
        console.log("msg",message)
        this.updateLastSeenToOnline(message)
        })
      
        this.socket.on('disconnected',async (id)=>{
        // console.log("msg",message)
        // this.updateLastSeen(message)
        if(id!=null){
         console.log(id);
        const response=await jwtInterceptor.post('/chat/disconnected-user',{id})
       console.log("res.....data.........",response.data)
       console.log("total users....",this.users);
      // for(var i=0;i<this.users.length;i++){
         for (var i in this.users) {
         if(id==this.users[i]._id){
           console.log("idsssssss",this.users[i]._id);
           console.log("before last seenssssss",this.users[i].lastseen);
           this.users[i].lastseen=new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
           console.log("after last seenssssss",this.users[i].lastseen);
           return
         }
       }
       }
})
        } catch (error) {
            console.log(error);
        }
    },
    methods:{
    //  async updateLastSeen(id){
       
    //   },
      async updateLastSeenToOnline(id){
       if(id!=null){
        const response=await jwtInterceptor.post('/chat/connected-user',{id})
       console.log("res.....data.........",response.data)
       console.log("total users....",this.users);
      // for(var i=0;i<this.users.length;i++){
         for (var i in this.users) {
         if(id==this.users[i]._id){
           console.log("idsssssss",this.users[i]._id);
           console.log("before last seenssssss",this.users[i].lastseen);
           this.users[i].lastseen="online"
           console.log("after last seenssssss",this.users[i].lastseen);
           return
         }
       }
       }
      }
    },
    // mounted(){
       
      
    // }
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