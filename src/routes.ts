import {Context} from "koa";
import Router from "@koa/router";
import HelloWorldService from "./hello_world";
import {userRoutes} from "./features/users/users.routes";

const router = new Router();

router.get('/hello/:name', HelloWorldService.helloWorld);
router.use('/users', userRoutes.routes());

export {router};