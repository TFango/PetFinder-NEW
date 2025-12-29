import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes";
import userRouter from "./src/routes/user.routes";
import petRouter from "./src/routes/pet.routes";
import reportRouter from "./src/routes/report.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(petRouter);
app.use(reportRouter);

export default app;
