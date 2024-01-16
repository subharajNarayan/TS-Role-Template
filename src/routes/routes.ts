import { lazy } from 'react';
const Login = lazy(() => import("../core/public/login/login"))

// const Dashboard = lazy(() => import("../core/protected/Dashboard/dashboard"))
const Signup = lazy(() => import("../core/public/signup/signup"))

// PROTECTED
const ProtectedHome = lazy(() => import("../core/protected/pages/Home/Home"));

// ADMIN
// const AdminHome = lazy(() => import("../core/public/Home/Home"))
const AdminHome = lazy(() => import("../core/admin/pages/Home/Home"));

const appRoutes: CustomRoute[] = [
    {
        path: "/login",
        component: Login,
        type: "login"
    },
    {
        path: "/signup",
        component: Signup,
        type: "signup"
    },

    // PROTECTED PANEL
    {
        path: "/auth/home",
        component: ProtectedHome,
        type: "authorized",
    },

    // ADMIN PANEL

    {
        path: "/admin/home",
        component: AdminHome,
        type: "authorized",
    },
]

export default appRoutes
