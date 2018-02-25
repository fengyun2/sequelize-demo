import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';

/* 引入路由文件 */

import backendRoutes from './routes/backend';

const app = new Koa();
const router = new Router();

const backendRouter = new Router({
  prefix: '/api',
});

// 中间件
app.use(bodyParser());
app.use(json());
app.use(logger());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: '请求成功',
  };
});
app.use(router.routes()).use(router.allowedMethods());

// 路由中间件
app.use(backendRouter.routes(), backendRouter.allowedMethods());
backendRoutes(backendRouter);

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured: ', err);
});

const port = 3000;
const server = http.createServer(app.callback());
server.listen(port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  console.log('Listening on port: %d', port);
});

export default app;
