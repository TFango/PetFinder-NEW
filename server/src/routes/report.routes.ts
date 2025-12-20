import { Router } from "express";
import * as ReportController from "../controllers/reportController";

const reportRouter = Router();

reportRouter.post("/pets/:petId/report", ReportController.createReport);

export default reportRouter;
