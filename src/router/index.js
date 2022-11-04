import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import EditView from "../views/EditView.vue";
import ManageView from "../views/ManageView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import CompanieView from "../views/CompanieView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView
        },
        {
            path: '/edit/:id:action',
            name: 'edit',
            component: EditView,
        },
        {
            path: '/manage',
            name: 'manage',
            component: ManageView,
        },
        {
            path: '/account',
            name: 'editaccount',
            component: EditProfileView,
        },
        {
            path: '/companie/:id',
            name: 'companie',
            component: CompanieView,
        },
    ]
})

export default router