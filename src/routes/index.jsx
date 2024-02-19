import AppLayout from '@layouts/AppLayout';
import MainLayout from '@layouts/MainLayout';
import Dashboard from '@pages/Dashboard/Index';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import ProductDashboard from '@pages/ProductDashboard';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    protected: true,
    component: Dashboard,
    layout: AppLayout,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    protected: true,
    component: Dashboard,
    layout: AppLayout,
  },
  {
    path: '/dashboard/product',
    name: 'Product Dashboard',
    protected: true,
    component: ProductDashboard,
    layout: AppLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
