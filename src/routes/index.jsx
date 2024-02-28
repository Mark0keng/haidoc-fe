import AppLayout from '@layouts/AppLayout';
import MainLayout from '@layouts/MainLayout';
import Address from '@pages/Address';
import Cart from '@pages/Cart';
import Chat from '@pages/Chat';
import ChatList from '@pages/ChatList';
import Dashboard from '@pages/Dashboard/Index';
import Doctor from '@pages/Doctor';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Order from '@pages/Order';
import OrderList from '@pages/OrderList';
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
    path: '/doctor',
    name: 'Doctor',
    protected: false,
    component: Doctor,
    layout: MainLayout,
  },
  {
    path: '/order',
    name: 'Order',
    protected: true,
    component: OrderList,
    layout: MainLayout,
  },
  {
    path: '/checkout/address',
    name: 'Address',
    protected: true,
    component: Address,
    layout: MainLayout,
  },
  {
    path: '/checkout/cart',
    name: 'Cart',
    protected: true,
    component: Cart,
    layout: MainLayout,
  },
  {
    path: '/checkout/order/:orderId',
    name: 'Order',
    protected: true,
    component: Order,
    layout: MainLayout,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    protected: true,
    isAdmin: true,
    isDoctor: true,
    component: Dashboard,
    layout: AppLayout,
  },
  {
    path: '/dashboard/product',
    name: 'Product Dashboard',
    protected: true,
    isAdmin: true,
    component: ProductDashboard,
    layout: AppLayout,
  },
  {
    path: '/chat-list/:id',
    name: 'ChatList',
    protected: true,
    isDoctor: true,
    component: ChatList,
  },
  {
    path: '/chat/:roomId',
    name: 'Chat',
    protected: true,
    component: Chat,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
