import Vue from 'vue'
import VueRouter from 'vue-router'
import vueValidator from  '@/js/validator/validate'

import '@/css/common'
import Common from '@/js/common'

import Index from '@/view/index'
import Content from '@/view/content'
import Recommend from '@/view/recommend'
import Read from '@/view/read'

Vue.use(VueRouter)
Vue.use(vueValidator, {autoHint: true});
var router = new VueRouter({
    routes: [
        {
            path: '/',
            component:Content,
            name:"content",
            children: [
                { path: '', component: Recommend },
                { path: '/Read', component: Read }
            ]
        }
    ]
});

var vue = new Vue({
    el: '#app',
    router: router,
    mixins: ["error"],
    render: h => h(Index)
    
})
router.push("/");