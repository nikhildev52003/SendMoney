import express from "express";
const app = express();
import { db } from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./router/user.js";
import { routerr } from "./router/account.js";

dotenv.config();

const PORT = process.env.PORT || 1000;

const corsOptions = {
  origin: ["http://localhost:5173", process.env.CLIENT_URL],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());


db(process.env.MONGO_URL);

app.use("/api/v1/user", router);
app.use("/api/v1/account", routerr);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
