import { Router } from "express";
import * as PetController from "../controllers/petController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload";

const petRouter = Router();

petRouter.post(
  "/pets",
  authMiddleware,
  upload.single("image"),
  PetController.createPet
);
petRouter.get("/pets/me", authMiddleware, PetController.getMyPets);
petRouter.get("/pets/nearby", PetController.getNearbyPets);
petRouter.patch(
  "/pets/:petId/found",
  authMiddleware,
  PetController.markAsFound
);
petRouter.patch(
  "/pets/:petId",
  authMiddleware,
  upload.single("image"),
  PetController.editPet
);
petRouter.get("/pets/:petId", authMiddleware, PetController.getPet);

export default petRouter;
