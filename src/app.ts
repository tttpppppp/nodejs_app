import { Routes } from "core/interface";
import express from "express";
import mongoose from "mongoose";
class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.SERVER_PORT || 3000;
    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  private async connectToDatabase() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error("DATABASE_URL is not defined.");
      return;
    }
    try {
      await mongoose.connect(dbUrl, {
        dbName: "nodejs_app",
      });
      console.log("Connected to the database successfully");
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
}

export default App;
