import VueRouter from 'vue-router';

let routes=[
    {
    path:'/register',
    component: () => import('../pages/Register.vue'),
    meta: { requiredAuth: false },

    },
    {
        path:'/login',
        component: () => import('../pages/Login.vue'),
        meta: { requiredAuth: false },

    },
    {
        path:'/chat',
        component: () => import('../pages/Chat.vue'),
        meta: { requiredAuth: false },

    },
    {
        path:'/chatbox/:id',
        name: 'chatbox',
        component: () => import('../pages/ChatBox.vue'),
        meta: { requiredAuth: false },

    },
]

 const router=new VueRouter({
    mode: 'history',
    routes
    
},
);
// router.beforeEach((to,from,next) => {
//     let isAuthenticated = localStorage.getItem("isAuthenticated");
//     if(to.meta.requiredAuth&&!isAuthenticated){
//         next('/login')
//     }else{
//         next()
//     }
// })
export default router