import { Router } from "express";
import IndexController from "./index.controller";
import { Routes } from "core/interface";

export default class IndexRoute implements Routes {
  public path = "/";
  public method = "get";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public indexController = new IndexController();

  private initializeRoutes() {
    this.router.get(this.path, this.indexController.index);
  }
}
