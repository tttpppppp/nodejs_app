import { Routes } from "core/interface";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { Logger } from "@core/utils";
import errorMiddleware from "./core/middleware/error.middeware";
import authMiddleware from "./core/middleware/auth.middeware";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import fs from "fs";
import { log } from "console";
class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.SERVER_PORT || 3000;
    this.connectToDatabase();
    this.production = process.env.NODE_ENV === "production";
    this.initializeMiddlewares();
    this.authMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initSwagger();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
  private initializeMiddlewares() {
    const corsOptions = {
      origin: process.env.CORS_ORIGIN || "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type, Authorization",
    };

    if (this.production) {
      this.app.use(helmet());
      this.app.use(morgan("combined"));
    } else {
      this.app.use(morgan("dev"));
    }
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private authMiddleware() {
    this.app.use(authMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`App listening on the port ${this.port}`);
    });
  }
  private async connectToDatabase() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      Logger.error("DATABASE_URL is not defined.");
      return;
    }
    try {
      await mongoose.connect(dbUrl, {
        dbName: "nodejs_app",
      });
      Logger.info("Connected to the database successfully");
      Logger.info(`Mongoose connected to: ${mongoose.connection.name}`);
    } catch (error) {
      Logger.error("Database connection error:", error);
    }
  }
  private initSwagger() {
    const file = fs.readFileSync("./swagger.yaml", "utf8");
    const swaggerDocument = YAML.parse(file);
    Logger.info("Swagger initialized");
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
}

export default App;
