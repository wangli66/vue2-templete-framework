/**
 * 用户信息
 * 1、存储用户的相关信息
 * 2、校验用户是否登录
 * 3、该文件仅做示例，具体逻辑和请求自行开发
 */
const user = {
    namespaced: true,
    state: {
        isLogin: false
    },
    mutations: {
        setLoginSate(state, isLogin) {
            state.isLogin = isLogin;
        },
        getUserInfo() {},
        saveUserInfo() {}
    },
    actions: {
        getUserInfo() {}
    }
};

export default user;
