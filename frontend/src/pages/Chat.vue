<template>
<div>
    <div class="container">
      <h3 class=" text-center mt-5 mb-3">Messaging</h3>
     <div class="inbox_msg mt-5" >
        <div class="inbox_people">
          
          <chat-header></chat-header>
        </div>
        <div class="chat">
         <h1 style="margin-top:25%">Welcome to The Chat</h1>
        </div>
     </div>
    </div>
    </div>
</template>

<script>
import ChatHeader from '../components/nav/ChatHeader.vue'
export default {
    components: { ChatHeader },
    
}
</script>

<style scoped>
.chat{
    text-align: center;
    margin:10px;
    text-align: center;
    margin: 15px;
    color: #05728f;
}
.text-center{
 color: #05728f;
 font-weight: 700;
}
</style>