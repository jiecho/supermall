import Vue from 'vue'
import VueRouter from 'vue-router'

//解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error)
}
const originalReplace= VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(error => error)
}

const Home = () => import('../views/home/Home.vue')
const Care = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Category = () => import('../views/category/Category.vue')
//1.安装插件
Vue.use(VueRouter)

const routes = [
  { path: '/', name: '', redirect: 'home' },
  { path: '/home', name: '', component: Home },
  { path: '/care', name: '', component: Care },
  { path: '/profile', name: '', component: Profile },
  { path: '/category', name: '', component: Category },
]

//2.创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router