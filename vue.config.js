const env = process.env;

module.exports = {
    lintOnSave: 'warning',
    transpileDependencies: true,
    // publicPath: env.BASE_URL,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        // 需要内网的其它机器也能访问时，将值改成 '0.0.0.0'
        host: 'localhost',
        /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */
        proxy: {
            [env.VUE_APP_BASEURL_API]: {
                target: env.DEV_PROXY_TARGET_API,
                changeOrigin: true,
                ws: true,
                pathRewrite: { '^/devServer': '/' }
            }
        }
    }
};
