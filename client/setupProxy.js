import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    ["/videos"],
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY,
      changeOrigin: true,
    })
  );
};
