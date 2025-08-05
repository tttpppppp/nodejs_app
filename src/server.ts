import express, { Request, Response } from "express";
import dotenv from "dotenv";
import App from "./app";
import { IndexRoute } from "@modules/index";
import { validEnv } from "@core/utils";
import UserRoute from "./module/users/user.route";

dotenv.config();
validEnv();
const routes = [new IndexRoute(), new UserRoute()];
const app = new App(routes);

app.listen();
