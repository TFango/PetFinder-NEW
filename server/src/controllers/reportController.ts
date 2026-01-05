import * as ReportService from "../services/reportService";
import { Request, Response } from "express";

export async function createReport(req: Request, res: Response) {
  try {
    const { petId } = req.params;

    const report = await ReportService.createReport(petId, req.body);

    return res
      .status(201)
      .json({ message: "Reporte creado con exito", report});
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
