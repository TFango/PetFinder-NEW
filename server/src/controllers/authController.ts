import * as AuthService from "../services/authService";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  try {
    const userInstance = await AuthService.register(req.body);
    const user = userInstance.get({ plain: true });

    const token = jwt.sign({ userId: user.id }, process.env.SECRET!);

    res.status(201).json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.mesagge });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const userInstance = await AuthService.login(email, password);

    const user = userInstance.get({ plain: true });
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET!
    );

    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { newPassword } = req.body;

    await AuthService.changePassword(userId, newPassword);

    return res.status(200).json({ message: "Contraseña cambiado con exito" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function chekEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await AuthService.chekEmail(email);

    res.json({
      exists: Boolean(user),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
