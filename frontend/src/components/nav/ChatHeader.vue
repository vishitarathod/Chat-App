<template>
<div v-on:mouseover="getNotificationds">
  <div class="headind_srch">
            <div class="recent_heading">
              <h4>Chats</h4>
            </div>
          </div>
     <div class="inbox_chat">
            <div v-for="user of users" :key="user._id" class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                 <!-- <button @click.prevent="test"> <h5><router-link :to="{path:`/chatbox/${user._id}`}" >{{user.name}}</router-link> </h5></button> -->
                 <router-link class="router"  :to="{name: 'chatbox', params: { id: user._id }}">{{user.name}}</router-link>
                 <!-- <p v-if="user.lastseen=='online'">{{user.lastseen}} </p>  -->
                  <p>Last seen {{user.lastseen}}</p> 
                  <p> {{user.notify}}</p>
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
            notifications:[],
            userss:[],
            socket:io('http://localhost:3000'),
            offline:'',
            name:'',
            senderId:this.$senderId
        }
    },
    created(){
        this.getNotificationds()
    },
    methods:{
      
     async getNotificationds(){
         const response=await jwtInterceptor.post("/chat/all-user",{senderId:this.$senderId})
       this.userss=response.data
    
       const response1=await jwtInterceptor.post("/chat/all-notification",{receiverId:this.$senderId})
       this.notifications=response1.data

     //('users',this.userss);
     //('notify',this.notifications);
      for (var i in this.userss) { 
        for(var j in this.notifications){
            //('hhhhhhhhhhh');
          if(this.userss[i]._id==this.notifications[j].senderId){
        // this.users[i].lastseen=response.data
       
         this.userss[i].notify=this.notifications[j].notification_count

      }
   } 
    }

    this.users=this.userss
    console.log("users",this.users);
     console.log("userss",this.userss);
      }
      
    },
    // watch:{
    //   users:{
    //     // deep: true,
    //     // immediate: true,

    //       // handler: 'getNotificationds',
    //   }
    // },
// watch: {
//     users: {
//       handler:async function (before, after) {
//         console.log(after);
//         console.log("before",before);
//         // Return the object that changed
//         // let changed = after.filter( function( p, idx ) {
//         //   return Object.keys(p).some( function( prop ) {
//         //     return p[prop] !== before[idx][prop];
//         //   })
//         // })
//         // // Log it
//         // console.log(changed)
//           let apiURL1 ="/chat/all-notification";
//        const response1=await jwtInterceptor.post(apiURL1,{receiverId:this.$senderId})
//       const notifications=response1.data
       
//       //   //("mounted",notifications);
//             for (var i in before) { 
//         for(var j in notifications){
//           //   //('hhhhhhhhhhh');
//           if(before[i]._id==notifications[j].senderId){
//         // this.users[i].lastseen=response.data
       
//          before[i].notify=notifications[j].notification_count

//          after=before

//       }
//    } 
//     }
//       },
//       deep: true
//     }
//   }
// ,
 

   async mounted(){
    //  this.getNotificationds()
      this.socket.on('notification',async()=>{
         //('i am in chat header');
        const payload={
          users:this.users,
          notifications:this.notifications,
          receiverId:this.$senderId
        }
         await this.$store.dispatch("getNotificationCount",payload)
        
        })
       
       
        this.socket.on('connected',async(id)=>{
       const payload={
          users:this.users,
          id:id
        }
       await this.$store.dispatch("updateLastSeenToOnline",payload)
        }) 
      this.socket.on('disconnected',async(id)=>{
       const payload={
          users:this.users,
          id:id
        }
       await this.$store.dispatch("updateLastSeen",payload)
        })

         //('heyyyyyyyyyyyyyy');
    },

    
  //    beforeDestroy() {
  //       this.socket.on('disconnected',async(id)=>{
  //      const payload={
  //         users:this.users,
  //         id:id
  //       }
  //      await this.$store.dispatch("updateLastSeen",payload)
  //       })
  //        alert("heyyyy")
  //    //('Main Vue destroyed')
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