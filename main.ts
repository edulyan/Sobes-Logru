import express, { Express } from "express";
import dotenv from "dotenv";
import { userRouter } from "./src/user/user.route";
const mongoose = require("mongoose");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/", userRouter);

const start = async () => {
  try {
    await mongoose.connect(
      String(process.env.MONGOOSE_DB),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (): void => console.log("DB connected")
    );
    app.listen(port, async () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
