import express, { Request, Response } from "express";
import dotenv from "dotenv";
import App from "./app";
import { IndexRoute } from "@modules/index";
import { validEnv } from "@core/utils";
import AuthRoute from "./module/auth/auth.route";
import UserRoute from "./module/users/user.route";
import ProfileRoute from "./module/profile/profile.route";

dotenv.config();
validEnv();
const routes = [
  new IndexRoute(),
  new UserRoute(),
  new AuthRoute(),
  new ProfileRoute(),
];
const app = new App(routes);

app.listen();
