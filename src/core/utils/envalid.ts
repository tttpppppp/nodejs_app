import { cleanEnv, str, email, json } from "envalid";

const validEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    DATABASE_URL: str(),
    SERVER_PORT: str({ default: "3000" }),
  });
};

export default validEnv;
