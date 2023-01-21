import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/Index.vue'
import checkAuth from '@/middleware/checkAuth.js';

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'layout',
            component: Layout,
            meta: { requiresAuth: true }
        },
        {
            path: '/referral',
            component: Layout,
            meta: { requiresAuth: true },
            children: [{
                path: 'index',
                component: () =>
                    import ('@/views/referral/Index.vue'),
                name: 'Referral',

            }]
        },
        {
            path: '/profile',
            component: Layout,
            meta: { requiresAuth: true },
            children: [{
                path: 'index',
                component: () =>
                    import ('@/views/profile/Index.vue'),
                name: 'Profile',
            }]
        },
        {
            path: '/safeguard-signal',
            component: Layout,
            meta: { requiresAuth: true },
            children: [{
                path: 'index',
                component: () =>
                    import ('@/views/safeguard-signal/Index.vue'),
                name: 'SafeguardSignal',
            }]
        },
        {
            path: '/token',
            component: () => import('@/views/Token.vue'),
            name: 'Token',
        },
        {
            path: '/401-unauthorized',
            component: () => import('@/views/error/401.vue'),
            name: '401-error',
        }
    ]
})

router.beforeEach(async (to, from, next) => {

    if(to.meta.requiresAuth) {
        let tokenStillExist = await checkAuth();

        if(tokenStillExist) {
            next();
        }else{
            next({ name: '401-error'});
        } 
    }else{
        next();
    }
    
});

export default router