import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../views/Chat'
import News from '../views/News'

Vue.use(Router)

export default new Router({
  base: '/xss',
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/news',
      name: 'News',
      component: News
    }
  ]
})
