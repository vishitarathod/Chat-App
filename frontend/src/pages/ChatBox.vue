<template>
<div class="container">
    <!-- <chat-header></chat-header> -->
<h3 class=" text-center">Messaging</h3>
<div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>All User</h4>
            </div>
            <!-- <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search" >
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div> -->
          </div>
          <chat-header></chat-header>
        </div>
        <div class="mesgs">
          <div class="msg_history">
            <div  v-for="msg of oldMessagesReceive" :key="msg" class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>{{msg.message}}</p>
                  <span class="time_date">{{msg.time}}</span></div>
              </div>
            </div>
            <div v-for="msg of oldMessagesSend" :key="msg" class="outgoing_msg">
              <div class="sent_msg">
                <p>{{msg.message}}</p>
                <span class="time_date"> {{msg.time}}</span> </div>
            </div>
             <!-- <p v-if="!newSendMessage">{{newSendMessage}}</p> -->
            <div  v-for="msg of newreceiveMessages" :key="msg" class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>{{msg}}</p>
                  <span class="time_date">{{time}}</span></div>
              </div>
            </div>
            <div v-for="msg of newSendMessage" :key="msg" class="outgoing_msg">
              <div class="sent_msg">
                <p>{{msg}}</p>
                <span class="time_date"> {{time}}</span> </div>
            </div>
            
            <!-- <div v-for="msg of newMessages" :key="msg" class="outgoing_msg">
              <div class="sent_msg">
                <p>{{msg}}</p>
                <span class="time_date"> {{time}}</span> </div>
            </div> -->
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" class="write_msg" placeholder="Type a message" v-model="text"/>
              <button class="msg_send_btn" type="submit"  @click.prevent="sendMessage()"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      
    </div></div>
</template>


<script>
import io from 'socket.io-client'
import ChatHeader from '../components/nav/ChatHeader.vue'
import axios from 'axios';

// import Chat from '../components/Chat.vue'
export default {
    components: { ChatHeader },
        data(){
        return{
            text:'',
            socket:'',
            oldMessagesReceive:[],
            oldMessagesSend:[],
            newSendMessage:[],
            newreceiveMessages:[],
            time:new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
        }
    },
    methods:{
   async sendMessage(){
       this.newSendMessage.push(this.text)
      console.log(`send: ${this.text}`);
      this.socket.emit('msgToServer',this.text);
     
     console.log(this.$senderId);
      const msg={
          senderId:this.$senderId,
          receiverId:this.$route.params.id,
          message:this.text,
          time:this.time
      }
    //   console.log(this.);
    const response= await axios.post('http://localhost:3000/chat/save-message',msg)
    console.log(response.data)
      if(response&&response.data){
          this.text='';
        //   this.newSendMessage=''
      }
  
    },
    receiverMessage(msg){
      console.log(`recv: ${msg}`);
      this.newreceiveMessages.push(msg)
    //   this.newreceiveMessages=''
    },
   async getAllMessages(){
          const msg={
          senderId:this.$senderId,
          receiverId:this.$route.params.id
        }
        const response= await axios.post('http://localhost:3000/chat/get-messages',msg)
        console.log(response.data)
        this.oldMessagesReceive=response.data.receive
        this.oldMessagesSend=response.data.send
    }
  },
  mounted(){
        //   this.socket=io('http://localhost:3000');
        //   this.socket.on('msgToClient',(message)=>{
        //   console.log(message);
        //   this.receiverMessage(message)
        // })
  },
watch: {

}, 
 async created(){
     try {
           this.socket=io('http://localhost:3000');
          this.socket.on('msgToClient',(message)=>{
          console.log(message);
          this.receiverMessage(message)
        })
     } catch (error) {
         console.log(error);
     }
  }
}
</script>

<style>
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5 router-link{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>