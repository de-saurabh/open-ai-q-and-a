const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx: { response: { get: (arg0: string) => any; }; method: any; url: any; }, next: () => any) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx: { set: (arg0: string, arg1: string) => void; }, next: () => any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx: { body: string; }) => {
  ctx.body = 'Hello World';
});

app.listen(3000);