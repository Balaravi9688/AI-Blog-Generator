import config from "./config/index.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log("server is running on : ", PORT);
});
