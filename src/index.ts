import cors from "cors";
import express from "express";
import "dotenv/config";

import userRounter from "./routes/user.route";

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
  }),
);

app.use("/v1/users", userRounter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server is running.... ${process.env.APP_PORT} 🦄🌈✨👋🌎🌍🌏✨🌈🦄`,
  );
});

export default app;
