import {Context} from "koa";
import Router from "@koa/router";
import HelloWorldService from "./hello_world";

const router = new Router();

router.get('/hello/:name', HelloWorldService.helloWorld);

export {router};