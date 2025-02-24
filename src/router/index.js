import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Login from '../views/pages/auth/Login.vue';
import { isAuthenticated } from '../service/userInfo.js';

const routes = [
    {
        path: '/',
        redirect: '/dashboard' // Redirigir al dashboard si el usuario está autenticado
    },
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: { requiresAuth: true, roles: [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13] }
            },
            {
                path: '/rrhh',
                name: 'gestion humana',
                component: () => import('@/views/Rrhh.vue'),
                meta: { requiresAuth: true, roles: [0, 1] }
            },
            {
                path: '/operadores',
                name: 'operadores',
                component: () => import('@/views/Operadores.vue'),
                meta: { requiresAuth: true, roles: [0, 2] }
            },
            {
                path: '/uri',
                name: 'uri',
                component: () => import('@/views/Uri.vue'),
                meta: { requiresAuth: true, roles: [0, 3] }
            },
            {
                path: '/tecnologia',
                name: 'tecnologia',
                component: () => import('@/views/Tecnologia.vue'),
                meta: { requiresAuth: true, roles: [0, 4] }
            },
            {
                path: '/admin',
                name: 'admin',
                meta: { requiresAuth: true, roles: [0] },
                component: () => import('@/views/Admin.vue')
            },
            {
                path: '/articulacion',
                name: 'articulacion',
                meta: { requiresAuth: true, roles: [0, 8] },
                component: () => import('@/views/Articulacion.vue')
            },
        ]
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = isAuthenticated.value;

    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'login' });
    } else if (to.meta.roles && !to.meta.roles.some(role => user.roles.includes(role.toString()))) {
        next({ name: 'dashboard' }); // Redirigir al dashboard si el usuario no tiene permiso
    } else {
        next();
    }
});

export default router;



/*
{
    path: '/uikit/formlayout',
    name: 'formlayout',
    component: () => import('@/views/uikit/FormLayout.vue')
},
{
    path: '/uikit/input',
    name: 'input',
    component: () => import('@/views/uikit/Input.vue')
},
{
    path: '/uikit/floatlabel',
    name: 'floatlabel',
    component: () => import('@/views/uikit/FloatLabel.vue')
},
{
    path: '/uikit/invalidstate',
    name: 'invalidstate',
    component: () => import('@/views/uikit/InvalidState.vue')
},
{
    path: '/uikit/button',
    name: 'button',
    component: () => import('@/views/uikit/Button.vue')
},
{
    path: '/uikit/table',
    name: 'table',
    component: () => import('@/views/uikit/Table.vue')
},
{
    path: '/uikit/list',
    name: 'list',
    component: () => import('@/views/uikit/List.vue')
},
{
    path: '/uikit/tree',
    name: 'tree',
    component: () => import('@/views/uikit/Tree.vue')
},
{
    path: '/uikit/panel',
    name: 'panel',
    component: () => import('@/views/uikit/Panels.vue')
},

{
    path: '/uikit/overlay',
    name: 'overlay',
    component: () => import('@/views/uikit/Overlay.vue')
},
{
    path: '/uikit/media',
    name: 'media',
    component: () => import('@/views/uikit/Media.vue')
},
{
    path: '/uikit/menu',
    component: () => import('@/views/uikit/Menu.vue'),
    children: [
        {
            path: '/uikit/menu',
            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
        },
        {
            path: '/uikit/menu/seat',
            component: () => import('@/views/uikit/menu/SeatDemo.vue')
        },
        {
            path: '/uikit/menu/payment',
            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
        },
        {
            path: '/uikit/menu/confirmation',
            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
        }
    ]
},
{
    path: '/uikit/message',
    name: 'message',
    component: () => import('@/views/uikit/Messages.vue')
},
{
    path: '/uikit/file',
    name: 'file',
    component: () => import('@/views/uikit/File.vue')
},
{
    path: '/uikit/charts',
    name: 'charts',
    component: () => import('@/views/uikit/Chart.vue')
},
{
    path: '/uikit/misc',
    name: 'misc',
    component: () => import('@/views/uikit/Misc.vue')
},
{
    path: '/blocks',
    name: 'blocks',
    component: () => import('@/views/utilities/Blocks.vue')
},
{
    path: '/utilities/icons',
    name: 'icons',
    component: () => import('@/views/utilities/Icons.vue')
},
{
    path: '/pages/timeline',
    name: 'timeline',
    component: () => import('@/views/pages/Timeline.vue')
},
{
    path: '/pages/empty',
    name: 'empty',
    component: () => import('@/views/pages/Empty.vue')
},
{
    path: '/pages/crud',
    name: 'crud',
    component: () => import('@/views/pages/Crud.vue')
},
{
    path: '/documentation',
    name: 'documentation',
    component: () => import('@/views/utilities/Documentation.vue')
}
]
},
{
    path: '/landing',
    name: 'landing',
    component: () => import('@/views/pages/Landing.vue')
},
{
    path: '/pages/notfound',
    name: 'notfound',
    component: () => import('@/views/pages/NotFound.vue')
},

{
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/pages/auth/Login.vue')
},
{
    path: '/auth/access',
    name: 'accessDenied',
    component: () => import('@/views/pages/auth/Access.vue')
},
{
    path: '/auth/error',
    name: 'error',
    component: () => import('@/views/pages/auth/Error.vue')
}
*/ 