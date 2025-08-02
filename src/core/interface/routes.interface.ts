import { Router } from "express";

interface Routes {
  path: string;
  method: string;
  router: Router;
}

export default Routes;
