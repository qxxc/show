import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import film_desc from '@/components/pages/film_desc'
import register from '@/components/pages/register'
import shop from '@/components/pages/shop'
import user from '@/components/pages/user'
import userinfo from '@/components/pages/userinfo'
import admin_login from '@/components/pages/admin_login'
import admin_register from '@/components/pages/admin_register'
import admin_index from '@/components/pages/admin_index'
import admin_index_film from '@/components/pages/admin_index_film'
import admin_index_film_operate from '@/components/pages/admin_index_film_operate'
import admin_index_play_hall from '@/components/pages/admin_index_play_hal'
import admin_index_play_plan from '@/components/pages/admin_index_play_plan'
import admin_index_employee from '@/components/pages/admin_index_employee'
import admin_index_user from '@/components/pages/admin_index_user'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/film_desc',
      name:'film_desc',
      component: film_desc
    },
    {
      path:'/register',
      name:'register',
      component: register
    },
    {
      path:'/shop',
      name:'shop',
      component: shop
    },
    {
      path:'/user',
      name:'user',
      component: user
    },
    {
      path:'/userinfo',
      name:'userinfo',
      component: userinfo
    },
    {
      path: '/admin',
      name: 'login',
      component: admin_login
    },
    {
      path: '/admin/register',
      name: 'register',
      component: admin_register
    },
    {
      path: '/admin/index',
      name: 'index',
      component: admin_index,
      children: [
        { path: 'index_film', component: admin_index_film },
        { path: 'index_film_operate', component: admin_index_film_operate },
        { path: 'index_play_hall', component: admin_index_play_hall },
        { path: 'index_play_plan', component: admin_index_play_plan },
        { path: 'index_employee', component: admin_index_employee },
        { path: 'index_user', component: admin_index_user },
      ]
    }
  ]
})
