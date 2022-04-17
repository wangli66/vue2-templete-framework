import Vue from 'vue';
import Vuex from 'vuex';
import crumb from './crumb/index.js';
import user from './user/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        crumb: crumb,
        user: user
    }
});
