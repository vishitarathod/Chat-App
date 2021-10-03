<template>
<div>
     <form>
    <input type="text" v-model="text">
    <button type="submit" @click.prevent="sendMessage()">Click</button>
    </form>
   <p>
    <ul>
      <li v-for="msg of messages" :key="msg">{{msg}}</li>
    </ul>
   </p>
</div>
</template>

<script>
import io from 'socket.io-client'
export default {
    data(){
        return{
            text:'',
            socket:'',
            messages:["some message"]
        }
    },
    methods:{
    sendMessage(){
      console.log(`send: ${this.text}`);
      this.socket.emit('msgToServer',this.text);
      this.text='';
    },
    receiverMessage(msg){
      console.log(`recv: ${msg}`);
      this.messages.push(msg)
    }
  },
  mounted(){
      this.socket=io('http://localhost:3000');
      this.socket.on('msgToClient',(message)=>{
          console.log(message);
      this.receiverMessage(message)
    })
    this.socket.on('receive',(message)=>{
        console.log(message);
        this.receiverMessage(message.message)
    })
  },
  created(){
    
  }
}
</script>