import Koa from 'koa';
import {router} from "./routes";
import bodyParser from 'koa-bodyparser';
import "reflect-metadata"
import { PostgresDataSource } from "./app-data-source"

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(bodyParser());

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// routes
app.use(router.routes());

app.listen(port);

console.log('Server is running on port ' + port);

PostgresDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

