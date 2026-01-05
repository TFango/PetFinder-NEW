import { log } from "console";
import { Pet } from "../models";
import * as PetService from "../services/petService";
import { Request, Response } from "express";

export async function createPet(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    const pet = await PetService.createPet(
      userId,
      req.body,
      req.file // 👈 ahora sí
    );
    return res.status(201).json({ message: "Pet creado con exito", pet });
  } catch (err: any) {
    return res.status(400).json({ error: err.mesagge });
  }
}

export async function getMyPets(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const pets = await PetService.getMyPets(userId);

    res.json({ pets });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getNearbyPets(req: Request, res: Response) {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);

    const results = await PetService.getNearbyPets(lat, lng);

    res.json({ results });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

export async function markAsFound(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { petId } = req.params;

    console.log("pet id", petId);

    await PetService.markAsFound(userId, petId);

    res.json({ message: "Mascota marcada como encontrada" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function editPet(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { petId } = req.params;

    await PetService.editPet(userId, petId, req.body, req.file);
    return res.json({ message: "Mascota perdida editada con exito" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
export async function getPet(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { petId } = req.params;

  const pet = await PetService.getPetById(userId, petId);
  res.json({ pet });
}
