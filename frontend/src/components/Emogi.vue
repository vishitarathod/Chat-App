<template>
    <div>
<emoji-picker @emoji="insert" >
  <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
    <button class="emoji_send_btn" type="submit"><i class="fa-regular fa-face-laugh"></i></button>
  </div>
  <div slot="emoji-picker" class="emoji-wrapper" slot-scope="{ emojis, insert }">
    <div>
      <div>
        <div v-for="(emojiGroup, category) in emojis" :key="category">
          <h5>{{ category }}</h5>
          <div>
            <span
              v-for="(emoji, emojiName) in emojiGroup"
              :key="emojiName"
              @click="insert(emoji)"
              :title="emojiName"
            >{{ emoji }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</emoji-picker>
    </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'
export default {

    components: {
    EmojiPicker,
     },

  methods: {
    insert(emoji) {
      this.$emit('changeTitle',emoji)
    },
  },
}
</script>

<style scoped>
.emoji_send_btn {
  /* background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px; */
  height: 34px;
  width: 34px;
}
</style>