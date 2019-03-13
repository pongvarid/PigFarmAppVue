import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
    return () => import(`../views/${view}.vue`)
}


   
   
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: loadView('Home')
        },
        { 
            path: '/login',
            name: 'login',
            component: loadView('Login')
        },
        {
            path: '/pig/manager',
            name: 'pig-manager',
            component: loadView('PigManager')
        },
        {
            path: '/pig/vaccine',
            name: 'pig-vaccine',
            component: loadView('Vaccine')
        },
        {
            path: '/pig/soundcard',
            name: 'pig-soundcard',
            component: loadView('SoundCard')
        },
        {
            path: '/pig/cycles',
            name: 'pig-cycles',
            component: loadView('PigCycles')
        },
        {
            path: '/pig/cycles/detail',
            name: 'pig-cycles-detail',
            component: loadView('PigCycleDetail')
        },
        {
            path: '/pig/card',
            name: 'pig-card',
            component: loadView('Card')
        },
        
        
    ]
    
})
