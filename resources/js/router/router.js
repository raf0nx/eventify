import Home from '../components/main/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ErrorPage from '../components/error/ErrorPage'

export default {
    mode: "history",
    linkActiveClass: 'font-weight-bold',

    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
      {
        path: '*',
        component: ErrorPage
      },
    ]
};
