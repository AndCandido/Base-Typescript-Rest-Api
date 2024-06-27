import app from "./app";
import { config } from "dotenv";

config();

const apiPort = parseInt(process.env.API_PORT as string) ?? 3000;

app.listen(apiPort, () => {
  console.log(`Api running in http://localhost:${apiPort}`);
});
