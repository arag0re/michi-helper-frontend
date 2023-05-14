const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
   app.use(
      '/api',
      createProxyMiddleware({
         target: 'http://10.7.0.3:3001',
         changeOrigin: true,
         onProxyReq: (proxyRes, req, res) => {
            res.on('close', () => proxyRes.destroy())
         },
      }),
   )
}
