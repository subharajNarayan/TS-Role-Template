import { lazy } from 'react';
const Login = lazy(() => import("../core/public/login/login"))

// const Dashboard = lazy(() => import("../core/protected/Dashboard/dashboard"))
const Signup = lazy(() => import("../core/public/signup/signup"))

// PROTECTED
const ProtectedHome = lazy(() => import("../core/protected/pages/Home/Home"));
const ProtectedStudent = lazy(() => import("../core/protected/pages/Student"));

// ADMIN
// const AdminHome = lazy(() => import("../core/public/Home/Home"))
const AdminHome = lazy(() => import("../core/admin/pages/Home/Home"));
const AdminForm = lazy(() => import("../core/admin/pages/Task"));

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
    {
        path: "/auth/student",
        component: ProtectedStudent,
        type: "authorized"
    },

    // ADMIN PANEL

    {
        path: "/admin/home",
        component: AdminHome,
        type: "authorized",
    },
    {
        path: "/admin/form",
        component: AdminForm,
        type: "authorized"
    },
]

export default appRoutes
