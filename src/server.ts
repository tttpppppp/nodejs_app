import express, { Request, Response } from "express";
import dotenv from "dotenv";
import App from "./app";
import { IndexRoute } from "./module/index";
dotenv.config();

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
