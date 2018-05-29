<style>
.xss-chat-browser {
  display: flex;
  justify-content: space-around;
  padding-top: 200px;
}
.xss-chat-browser .browser-box {
  max-width: 500px;
  margin: 10px;
}
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
.xss-lesson-nav {
  height: 80px;
  background: #607D8B;
}
.xss-lesson-title {
  margin: 0;
  padding: 10px 0;
}
.xss-lesson-steps {
  display: flex;
}
.xss-lesson-step {
  background: #ccc;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: 0 5px;
}
.xss-lesson-step.done {
  background: #fff;
}

.xss-lesson-tip {
  display: flex;
  position: absolute;
  top: 70px;
  flex-flow: column;
  box-shadow: 0px 9px 20px 4px #0000002b;
  border-radius: 4px;
  min-height: 200px;
  width: 400px;
  text-align: left;
  z-index: 100;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.xss-lesson-tip-body {
  flex: 100%;
  font-size: 12px;
}
.xss-lesson-tip-action {
  display: flex;
  justify-content: flex-end;
}
.xl-btn {
  background: #4CAF50;
  color: #fff;
  border: 1px solid #4CAF50;
  border-radius: 14px;
  height: 28px;
  min-width: 70px;
  font-size: 12px;
  outline: none;
}

@media (max-width: 768px) {
  .xss-chat-browser {
    display: block;
    padding: 100px 10px 10px 10px;
    box-sizing: border-box;
  }
  .xss-lesson-tip {
    max-width: 90%;
    left: 50%;
    top: 0;
    min-height: 160px;
    transform: translate(-50%, 10px);
  }
  .xss-chat-browser .browser-box {
    width: 100%;
    margin: 10px 0;
    box-sizing: border-box;
    min-width: initial;
  }
}
</style>

<template>
  <div class="container xss-chat">
    <div class="xss-lesson-nav">
      <h2 class="xss-lesson-title">
        CROSS-SITE SCRIPTING
      </h2>
      <div class="xss-lesson-steps">
        <div class="xss-lesson-step" :class="{ done: stepCount > index }" v-for="(step, index) in steps" @click="stepHandler(index)"></div>
      </div>
    </div>

    <div class="xss-lesson-tip" v-show="state.tip">
      <div class="xss-lesson-tip-body">
        {{ state.tip }}
      </div>
      <div class="xss-lesson-tip-action">
        <button class="xl-btn" @click="nextStep">下一步</button>
      </div>
    </div>

    <div class="xss-chat-browser">
      <Browser>
        <SimpleIm client="A" :messages="state.msgs" :typein.sync="state.clientATypein" @new-message="sendMsg"></SimpleIm>
      </Browser>
      <Browser>
        <SimpleIm client="B" :messages="state.msgs" :typein.sync="state.clientBTypein" @new-message="sendMsg"></SimpleIm>
      </Browser>
    </div>
  </div>
</template>

<script>
import Browser from '../components/Browser.vue'
import SimpleIm from '../components/SimpleIm.vue'

const AvatarMap = {
  'A': 'https://wx1.sinaimg.cn/square/69402bf8ly1frp2a4sc6qj20eu0eg4a7.jpg',
  'B': 'https://wx1.sinaimg.cn/square/69402bf8ly1fozhw041nkj2050050mwy.jpg'
}

async function wait (time) {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

async function typeWords (str, setter) {
  let current = ''
  for (let i = 0, len = str.length; i < len; i++) {
    current += str[i]
    setter(current)
    await wait(200)
  }
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      state: {
        msgs: [],
        clientATypein: '',
        clientBTypein: '',
        tip: ''
      },
      stepCount: 0,
      steps: [{
        state: {
          msgs: [],
          clientATypein: '',
          clientBTypein: '',
          tip: '这里是一个简单的 web im demo, 我们通过它来了解 XSS'
        },
        handler: async (vm, state) => {}
      }, {
        state: {
          msgs: [],
          clientATypein: '',
          clientBTypein: '',
          tip: '这里是两个人在通过 IM 聊天'
        },
        handler: async (vm, state) => {
          await typeWords('在吗？', async content => {
            state.clientATypein = content
          })
          vm.sendMsg(state.clientATypein, 'A')
          state.clientATypein = ''

          await typeWords('啥事？', async content => {
            state.clientBTypein = content
          })
          vm.sendMsg(state.clientBTypein, 'B')
          state.clientBTypein = ''

          await typeWords('没啥事，就是...', async content => {
            state.clientATypein = content
          })
          vm.sendMsg(state.clientATypein, 'A')
          state.clientATypein = ''
        }
      }, {
        state: {
          tip: '刚才的聊天都是输出的普通文字，如果我们换成输入 HTML 会怎么样？',
          msgs: [{
            'id': 1,
            'client': 'A',
            'avatar': 'https://wx1.sinaimg.cn/square/69402bf8ly1frp2a4sc6qj20eu0eg4a7.jpg',
            'message': '在吗？'
          }, {
            'id': 2,
            'client': 'B',
            'avatar': 'https://wx1.sinaimg.cn/square/69402bf8ly1fozhw041nkj2050050mwy.jpg',
            'message': '啥事？'
          }, {
            'id': 3,
            'client': 'A',
            'avatar': 'https://wx1.sinaimg.cn/square/69402bf8ly1frp2a4sc6qj20eu0eg4a7.jpg',
            'message': '没啥事，就是...'
          }],
          clientATypein: '',
          clientBTypein: ''
        },
        handler: async (vm, state) => {
          await typeWords(`没事, <img src="`, async content => {
            state.clientATypein = content
          })
          state.clientATypein += '//wx1.sinaimg.cn/square/69402bf8ly1fozhw041nkj2050050mwy.jpg">'
          vm.sendMsg(state.clientATypein, 'A')
          state.clientATypein = ''
        }
      }, {
        state: {
          tip: '如果是够执行 JS 的话',
          msgs: [{
            'id': 1,
            'client': 'A',
            'avatar': 'https://wx1.sinaimg.cn/square/69402bf8ly1frp2a4sc6qj20eu0eg4a7.jpg',
            'message': '在吗？'
          }, {
            'id': 2,
            'client': 'B',
            'avatar': 'https://wx1.sinaimg.cn/square/69402bf8ly1fozhw041nkj2050050mwy.jpg',
            'message': '啥事？'
          }, {
            'id': 3,
            'client': 'A',
            'avatar': 'https://wx1.sinaimg.cn/square/69402bf8ly1frp2a4sc6qj20eu0eg4a7.jpg',
            'message': '没啥事，就是...'
          }],
          clientATypein: '',
          clientBTypein: ''
        },
        handler: async (vm, state) => {
          await typeWords(`没事, <img src="1" onerror="alert('you have been hacked')">`, async content => {
            state.clientATypein = content
          })
          vm.sendMsg(state.clientATypein, 'A')
          state.clientATypein = ''
        }
      }]
    }
  },
  components: {
    Browser,
    SimpleIm
  },
  mounted () {
    this.nextStep()
  },
  methods: {
    async nextStep () {
      this.state.tip = ''
      await this.stepHandler(this.stepCount)
    },
    async stepHandler (index) {
      this.state.tip = ''
      if (index > this.steps.length - 1) return
      this.state = JSON.parse(JSON.stringify(this.steps[index].state))
      this.steps[index].handler(this, this.state)
      this.stepCount = index + 1
    },
    sendMsg (message, client) {
      this.state.msgs.push({
        id: this.state.msgs.length + 1,
        client: client,
        avatar: AvatarMap[client],
        message: message
      })
    }
  }
}
</script>
