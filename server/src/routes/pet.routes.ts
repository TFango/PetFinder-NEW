import { Router } from "express";
import * as PetController from "../controllers/petController";
import { authMiddleware } from "../middlewares/auth.middleware";

const petRouter = Router();

petRouter.post("/pets", authMiddleware, PetController.createPet);
petRouter.get("/pets/me", authMiddleware, PetController.getMyPets);
petRouter.get("/pets/near", PetController.getNearbyPets);
petRouter.patch(
  "/pets/:petId/found",
  authMiddleware,
  PetController.markAsFound
);
petRouter.patch("/pets/:petId", authMiddleware, PetController.editPet);

export default petRouter;
