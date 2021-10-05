<template>
<div>
    <div class="container">
     <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>All User</h4>
            </div>
          </div>
          <chat-header></chat-header>
        </div>
        <div class="chat">
         <h1 style="margin-top:25%">welcome to the chat</h1>
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
    margin: 17px;
}
</style>