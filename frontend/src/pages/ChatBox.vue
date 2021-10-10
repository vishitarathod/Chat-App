<template>
<div class="container">
<h3 class=" text-center mt-5 mb-3">Messaging</h3>
<div class="messaging">
      <div class="inbox_msg mt-5">
        <div class="inbox_people">
            <!-- <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search" >
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div> -->
          <chat-header></chat-header>
        </div>

        <div class="mesgs">
          <div class="msg_history">
            <div  v-for="msg of oldMessages" :key="msg._id">
              <div v-if="msg.senderId==LoginsenderId" class="outgoing_msg">
              <div class="sent_msg">
                <p>{{msg.message}}</p>
                <span class="time_date"> {{msg.time}}</span> </div>
            </div>
            <div v-else class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>{{msg.message}}</p>
                  <span class="time_date">{{msg.time}}</span></div>
              </div>
            </div>
          </div>
          <div v-for="msg in newMessages" :key="msg.msg">
            <div v-if="LoginsenderId!=msg.id" class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>{{msg.msg}}</p>
                  <span class="time_date">{{msg.time}}</span></div>
              </div>
            </div>
            <div  v-else class="outgoing_msg">
              <div class="sent_msg">
                <p>{{msg.msg}}</p>
                <span class="time_date"> {{msg.time}}</span> </div>
            </div>
          </div>
          </div>
          <div class="type_msg">
            
            <div class="input_msg_write">
              <emoji @changeTitle="inputEmoji($event)"></emoji>
              <input type="text" class="write_msg" placeholder="Type a message" v-model="text"/>
              <button class="msg_send_btn" type="submit"  @click.prevent="sendMessage()"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div></div>
</template>


<script>
// import Vue from 'vue'
import Emoji from '../components/Emogi.vue'
import io from 'socket.io-client'
import ChatHeader from '../components/nav/ChatHeader.vue'
import jwtInterceptor from '../plugins/jwt.interceptor'
// Vue.prototype.$count=0
export default {
    components: { ChatHeader ,Emoji},
    // props:['changeTitle'],
        data(){
        return{
            text:'',
            socket:'',
            oldMessages:[],
            senderIdReceived:'',
            LoginsenderId:this.$senderId,
            newMessages:[],
            tick:0,
        }
    },
    methods:{
   async sendMessage(){
    // var audio=new Audio('ting.mp3')
    //        audio.play()
  // console.log(Vue.prototype.$count+1);
    // this.tick=1
      const text={
        msg:this.text,
        id:this.$senderId,
        time:new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
      }
      this.socket.emit('msgToServer',text)
      const msg={
          senderId:this.$senderId,
          receiverId:this.$route.params.id,
          message:this.text,
          time:new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit',hour12:false})
      }

    const response= await jwtInterceptor.post('/chat/save-message',msg)

      if(response&&response.data){
        this.senderIdReceived=response.data.senderId
          this.text='';
      }
  
    },
    receiverMessage(msg){ 
      
      // if(msg.id!=this.LoginsenderId){
      //   // this.tick=2
      //   this.count++
      // }
      this.newMessages.push(msg)
    },
    inputEmoji(emoji){
      this.text += emoji
    }
  },
  mounted(){
          this.socket=io('http://localhost:3000')
          this.socket.on('msgToClient',(message)=>{
            console.log(message)
          this.receiverMessage(message)
        })


  },
 async created(){
     try {
          const msg={
          senderId:this.$senderId,
          receiverId:this.$route.params.id
        }
        const response= await jwtInterceptor.post('/chat/get-messages',msg)
        this.oldMessages=response.data
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
  display: flex;
}
.top_spac{ margin: 20px 0 0;}



.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}


.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}




.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}


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
.input_msg_write{display: flex; align-items: center; position: relative;}
.emoji-wrapper{position: absolute; left: 0; box-shadow: 0 0 8px 0 rgba(0,0,0,0.2); padding: 15px; border: 1px solid #c4c4c4; top:-100px; background-color: #fff;height: 100px; overflow-y: auto;}
.emoji-wrapper h5{font-size: 16px; line-height: 24px; color: #333333;}
.emoji-wrapper>div>div>div{margin-bottom: 12px;}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
  border: 0 !important;
  outline: none !important; 
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
 padding-top: 5px;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative; margin: 0 -15px 0 -25px; padding: 0 20px;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 34px;
  width: 34px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
.text-center{
 color: #05728f;
 font-weight: 700;
 
}
</style>