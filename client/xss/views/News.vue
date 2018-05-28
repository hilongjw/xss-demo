<style>
.xss-news {
  padding-top: 60px;
}
.xss-news .browser-box {
  width: 400px;
  height: 350px;
}
.simple-news {
  text-align: left;
}
.simple-news ul {
  margin: 0;
  padding: 0;
}
.simple-news-nav {
  padding: 10px;
  margin: 0;
}
</style>

<template>
  <div class="container xss-news">
    <Browser>
      <div class="simple-news">
        <p class="simple-news-nav">
          当前分类： <span v-html="tag"></span>
        </p>
        <ul>
          <EntryItem v-for="feed in feeds" :entry="feed" :key="feed._id"></EntryItem>
        </ul>
      </div>
    </Browser>
  </div>
</template>

<script>
import Browser from '../components/Browser.vue'
import axios from 'axios'
import EntryItem from '../components/Entry'

export default {
  data () {
    return {
      feeds: []
    }
  },
  computed: {
    tag () {
      return this.$route.query.tag || '全部'
    }
  },
  components: {
    Browser,
    EntryItem
  },
  mounted () {
    this.queryFeeds()
  },
  methods: {
    queryFeeds () {
      axios({
        url: 'https://api.umoon.net/api/v1/view',
        params: {
          include: 'source',
          skip: 0,
          limit: 10,
          descending: 'createdAt'
        }
      })
        .then(({ data }) => {
          this.feeds = data.result
        })
    }
  }
}
</script>

