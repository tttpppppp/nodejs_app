import express, { Request, Response } from "express";
import dotenv from "dotenv";
import App from "./app";
import { IndexRoute } from "./module/index";
import { validEnv } from "./core/utils";

dotenv.config();
validEnv();
const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
