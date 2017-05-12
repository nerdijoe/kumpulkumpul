import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Posts from '@/components/Posts'
import DetailPost from '@/components/DetailPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
		{
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
		{
      path: '/detail-post/:id',
      name: 'DetailPost',
      component: DetailPost,
			props : true
    },

  ]
})
