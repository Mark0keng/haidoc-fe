import AppLayout from '@layouts/AppLayout';
import MainLayout from '@layouts/MainLayout';
import Dashboard from '@pages/Dashboard/Index';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import ProductDashboard from '@pages/ProductDashboard';
import ProductDetail from '@pages/ProductDetail';
import Register from '@pages/Register';
import Shop from '@pages/Shop';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/shop',
    name: 'Shop',
    protected: false,
    component: Shop,
    layout: MainLayout,
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    protected: false,
    component: ProductDetail,
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
    protected: false,
    component: ProductDashboard,
    layout: AppLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
