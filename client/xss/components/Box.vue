<template>
  <div>
    <div v-if="content" v-html="content"></div>
    <div>{{ content }}</div>

    <div>
      <button @click="insertImg"> insertImg </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        markup: '555'
      }
    }
  },
  computed: {
    content () {
      const content = this.$route.query.content || 'nothing here'
      console.log(content)
      return content
    }
  },
  methods: {
    insertImg () {
      window.localStorage.someKey = Date.now()

      this.$router.push({
        name: 'Box',
        query: {
          content: `<img src="111" onerror="alert(window.localStorage['Thunder#:store'])">` + Date.now()
        }
      })
    }
  }
}
</script>