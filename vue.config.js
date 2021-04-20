//配置跨域问题，使用node配置转发，如果将来部署到生产环境，就可以使用nginx
//使用代理
let proxyObj ={};
//const CompressionPlugin =require("Compression-webpack-plugin");
proxyObj['/']={
    ws:false,
    target: 'http://localhost:8081',
    changeOrigin:true,
    pathRewrite: {
        '^/': ''
    }
}

module.exports ={
    devServer: {
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}