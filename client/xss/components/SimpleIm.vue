<style>
.simple-im {
  background: #efefef;
}
.simple-im-feed {
  height: 300px;
  overflow: auto;
}
.simple-im-typein {
  display: flex;
}
.simple-im-input {
  width: 100%;
  height: 30px;
  border: 1px solid #e8e8e8;
  outline: none;
  padding: 5px;
  line-height: 14px;
}
.simple-im-send-btn {
  width: 80px;
  background: #4CAF50;
  color: #fff;
  border: none;
}
</style>

<template>
  <div class="simple-im">
    <div class="simple-im-feed" ref="feed">
      <MsgItem v-for="msg in msgs" :data="msg" :key="msg.id"></MsgItem>
    </div>
    <div class="simple-im-typein">
      <input class="simple-im-input" v-model="message" @keyup.enter="sendMsg" type="text">
      <button class="simple-im-send-btn" @click="sendMsg">发送</button>
    </div>
  </div>
</template>

<script>
import MsgItem from './MsgItem.vue'

export default {
  props: {
    client: String,
    typein: String,
    messages: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    message: {
      set (val) {
        this.$emit('update:typein', val)
      },
      get () {
        return this.typein
      }
    },
    msgs () {
      this.$nextTick(() => {
        this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight
      })
      return this.messages.map(msg => {
        const isSelf = msg.client === this.client
        return {
          id: msg.id,
          self: isSelf,
          avatar: msg.avatar,
          message: msg.message
        }
      })
    }
  },
  components: {
    MsgItem
  },
  methods: {
    sendMsg () {
      this.$emit('new-message', this.message, this.client)
      this.message = ''
    }
  }
}
</script>