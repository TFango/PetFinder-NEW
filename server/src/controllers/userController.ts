import * as UserService from "../services/userService";
import { Request, Response } from "express";

export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const user = await UserService.getMe(userId);

    res.json({ user: user });
  } catch (err: any) {
    res.status(500).json({ error: err.mesagge });
  }
}

export async function updateMe(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { newName, newLocation } = req.body;

    await UserService.updateMe(userId, newName, newLocation);

    return res.status(200).json({ message: "User update con exito" });
  } catch (err: any) {}
}
