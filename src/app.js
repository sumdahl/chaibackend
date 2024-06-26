import express, { urlencoded } from "express";
import cors from "cors";
import { MAX_SIZE } from "./constants.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
1
app.use(
  express.json({
    limit: MAX_SIZE,
  })
);  
app.use(express.urlencoded({ extended: true, limit: MAX_SIZE }));
app.use(express.static("public"));
app.use(cookieParser());


//Routes import
import userRouter from "./routes/user.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter)

export { app };
