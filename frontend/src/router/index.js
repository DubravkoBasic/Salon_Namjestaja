import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt from 'jsonwebtoken'
import store from '@/store'

Vue.use(VueRouter)


const routes = [
    {
        path:'/',
        name : 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    },
    {
        path:'/registracija',
        name : 'Registracija',
        component: () => import(/* webpackChunkName: "about" */ '../views/registracija.vue'),
        beforeEnter: zabranaLogiranom
    },
    {
        path:'/prijava',
        name : 'Prijava',
        component: () => import(/* webpackChunkName: "about" */ '../views/prijava.vue'),
        beforeEnter: zabranaLogiranom
    },
    {
        path:'/dodajnamjestaj',
        name : 'Dodaj',
        component: () => import(/* webpackChunkName: "about" */ '../views/dodajnamjestaj.vue'),
        beforeEnter: samoAdmin
    },
    {
        path:'/kosarica',
        name : 'Kosarica',
        component: () => import(/* webpackChunkName: "about" */ '../views/kosarica.vue'),
        beforeEnter: zabranaNeLogiranom
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


function zabranaLogiranom (to, from, next){
    provjeraTokena()
    if(store.korisink_mail != "") next('/')
    next()
}


function zabranaNeLogiranom (to, from, next){
    provjeraTokena()
    if(store.korisink_mail === "") next('/')
    next()
}


function samoAdmin (to, from, next){
    provjeraTokena()
    if(!store.admin) next('/')
    next()
}


function provjeraTokena(){
    let token = localStorage.getItem('token')
    try {
        let decoded = decoded = jwt.verify(token, 'namjestaj')
        if(decoded){
            store.token = token
            store.korisink_mail = decoded._email
            store.admin = (decoded._admin === 'true');
        }
    } catch (error) {
        console.log(error);
    }
    
}

export default router