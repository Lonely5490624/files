import Home from './pages/home'
import Login from './pages/login'
import ErrorPage from './pages/error-page'
// import Dashboard from './pages/dashboard'
// import Department from './pages/department'
// import Job from './pages/job'
// import User from './pages/user'

const routeConfig = [{
    path: '/login',
    component: Login,
    // auth: true
},{
    path: '/home',
    component: Home,
    auth: true
},{
//     path: '/home/dashboard',
//     component: Dashboard,
//     auth: true
// },{
//     path: '/home/department',
//     component: Department,
//     auth: true
// },{
//     path: '/home/job',
//     component: Job,
//     auth: true
// },{
//     path: '/home/user',
//     component: User,
//     auth: true
// },{
    path: '/404',
    component: ErrorPage
},{
    path: '*',
    component: ErrorPage
}]

export default routeConfig