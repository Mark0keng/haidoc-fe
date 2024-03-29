import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'register',
  login: 'login',
  forgotPassword: 'forgot-password',
  changePassword: 'forgot-password/change',
  getProvince: 'address/province',
  getCity: 'address/city',
  getShippingCost: 'address/shipping-cost',
  getAddress: 'address',
  createAddress: 'address/create',
  updateAddress: 'address/update',
  getProduct: 'product',
  createProduct: 'product/create',
  updateProduct: 'product/update',
  deleteProduct: 'product/delete',
  getCart: 'cart',
  getUserCart: 'cart/user',
  createCart: 'cart/create',
  updateCart: 'cart/update',
  deleteCart: 'cart/delete',
  getUserOrder: 'order/user',
  createOrder: 'order/create',
  updateOrder: 'order/update',
  getOrderItem: 'order-item',
  createOrderItem: 'order-item/create',
  getPayment: 'payment',
  getDoctor: 'doctor',
  getChat: 'chat',
  deleteChat: 'chat/delete',
  getUserChatOrder: 'chat-order/user',
  createChatOrder: 'chat-order/create',
  updateChatOrder: 'chat-order/update',
  createChat: 'chat/create',
  getMessage: 'message',
  getLatestMessage: 'message/latest',
  createMessage: 'message/create',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const register = (payload) => callAPI(urls.register, 'post', {}, {}, payload);
export const login = (payload) => callAPI(urls.login, 'post', {}, {}, payload);
export const forgotPassword = (payload) => callAPI(urls.forgotPassword, 'post', {}, {}, payload);
export const changePassword = (payload) => callAPI(`${urls.changePassword}`, 'post', {}, {}, payload);

export const getProduct = (query) => callAPI(urls.getProduct, 'get', {}, query);
export const getProductById = (productId) => callAPI(`${urls.getProduct}/${productId}`, 'get');
export const createProduct = (payload) =>
  callAPI(urls.createProduct, 'post', { 'Content-Type': 'multipart/form-data' }, {}, payload);
export const updateProduct = (payload, productId) =>
  callAPI(`${urls.updateProduct}/${productId}`, 'put', { 'Content-Type': 'multipart/form-data' }, {}, payload);
export const deleteProduct = (productId) => callAPI(`${urls.deleteProduct}/${productId}`, 'delete');

export const getCart = (query) => callAPI(urls.getCart, 'get', {}, query);
export const getUserCart = (query) => callAPI(urls.getUserCart, 'get', {}, query);
export const getShippingCost = (query) => callAPI(urls.getShippingCost, 'get', {}, query);
export const createCart = (payload) => callAPI(urls.createCart, 'post', {}, {}, payload);
export const updateCart = (payload, cartId) => callAPI(`${urls.updateCart}/${cartId}`, 'put', {}, {}, payload);
export const deleteCart = (cartId) => callAPI(`${urls.deleteCart}/${cartId}`, 'delete');

export const getProvince = (query) => callAPI(urls.getProvince, 'get', {}, query);
export const getCity = (query) => callAPI(urls.getCity, 'get', {}, query);
export const getAddress = (query) => callAPI(urls.getAddress, 'get', {}, query);
export const createAddress = (payload) => callAPI(urls.createAddress, 'post', {}, {}, payload);
export const updateAddress = (payload) => callAPI(urls.updateAddress, 'put', {}, {}, payload);

export const getUserOrder = (query) => callAPI(urls.getUserOrder, 'get', {}, query);
export const createOrder = (payload) => callAPI(urls.createOrder, 'post', {}, {}, payload);
export const updateOrder = (payload, orderId) => callAPI(`${urls.updateOrder}/${orderId}`, 'put', {}, {}, payload);

export const getOrderItem = (query) => callAPI(urls.getOrderItem, 'get', {}, query);
export const createOrderItem = (payload) => callAPI(urls.createOrderItem, 'post', {}, {}, payload);

export const getPayment = (query) => callAPI(urls.getPayment, 'get', {}, query);

export const getDoctor = (query) => callAPI(urls.getDoctor, 'get', {}, query);

export const getChat = (query) => callAPI(urls.getChat, 'get', {}, query);
export const createChat = (payload) => callAPI(urls.createChat, 'post', {}, {}, payload);
export const deleteChat = (chatId) => callAPI(`${urls.deleteChat}/${chatId}`, 'delete');

export const getUserChatOrder = (query) => callAPI(urls.getUserChatOrder, 'get', {}, query);
export const createChatOrder = (payload) => callAPI(urls.createChatOrder, 'post', {}, {}, payload);
export const updateChatOrder = (payload, orderId) =>
  callAPI(`${urls.updateChatOrder}/${orderId}`, 'put', {}, {}, payload);

export const getMessage = (query) => callAPI(urls.getMessage, 'get', {}, query);
export const getLatestMessage = (query) => callAPI(urls.getLatestMessage, 'get', {}, query);
export const createMessage = (payload) => callAPI(urls.createMessage, 'post', {}, {}, payload);
