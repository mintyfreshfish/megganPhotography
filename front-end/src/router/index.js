import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import About from '../views/About.vue'
import Booking from '../views/Booking.vue'
import ContactForm from '../views/ContactForm.vue'
import Gallery from '../views/Gallery.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/booking',
    name: 'booking',
    component: Booking
  },
  {
    path: '/contact',
    name: 'contactform',
    component: ContactForm
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
