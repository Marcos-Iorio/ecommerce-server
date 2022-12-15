import { Express } from "express";
import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./src/routes/login";

const app: Express = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("api/users", userRoutes);

app.listen(port, () => {
  console.log("Server running at 3000");
});

export default app;
