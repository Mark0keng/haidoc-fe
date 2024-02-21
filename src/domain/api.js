import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'register',
  login: 'login',
  getProduct: 'product',
  createProduct: 'product/create',
  updateProduct: 'product/update',
  deleteProduct: 'product/delete',
  getCart: 'cart',
  getManyCart: 'cart/all',
  createCart: 'cart/create',
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

export const getProduct = (query) => callAPI(urls.getProduct, 'get', {}, query);
export const getProductById = (productId) => callAPI(`${urls.getProduct}/${productId}`, 'get');
export const createProduct = (payload) =>
  callAPI(urls.createProduct, 'post', { 'Content-Type': 'multipart/form-data' }, {}, payload);
export const updateProduct = (payload, productId) =>
  callAPI(`${urls.updateProduct}/${productId}`, 'put', { 'Content-Type': 'multipart/form-data' }, {}, payload);
export const deleteProduct = (productId) => callAPI(`${urls.deleteProduct}/${productId}`, 'delete');

export const getCart = (query) => callAPI(urls.getCart, 'get', {}, query);
export const getManyCart = (query) => callAPI(urls.getManyCart, 'get', {}, query);
export const createCart = (payload) => callAPI(urls.createCart, 'post', {}, {}, payload);
