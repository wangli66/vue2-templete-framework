/* axios 中文文档：http://www.axios-js.com/zh-cn/docs/ */

import Vue from 'vue';
import axios from 'axios';
import createAxios from './createAxios';
import http, { get, deleteRequest, head, options, post, put, patch } from './http.js';
import { cancel } from './exCancel';
const { isCancel } = axios;

export { axios, createAxios, http, get, deleteRequest, head, options, post, put, patch, cancel, isCancel };
export default http;

Vue.prototype.$get = get;
Vue.prototype.$delete = deleteRequest;
Vue.prototype.$head = head;
Vue.prototype.$options = options;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$patch = patch;
Vue.prototype.$axios = axios;
