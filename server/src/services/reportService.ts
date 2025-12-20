//createReport

import { Pet, Report, User } from "../models";
import { sendEmail } from "./sendEmailService";

export async function createReport(petId: string, data: any) {
  if (!petId) {
    throw new Error("Falta el id de la moscota");
  }

  const { name, reporterPhone, location } = data;

  if (!name || !reporterPhone || !location) {
    throw new Error("Falta info necesaria");
  }

  const report = await Report.create({
    name,
    reporterPhone,
    location,
    PetId: petId,
  });

  const pet = await Pet.findByPk(petId);
  if (!pet) {
    throw new Error("Mascota no encontrada");
  }

  const userId = pet.get("UserId") as string;
  const user = await User.findByPk(userId);

  if(!user){
    throw new Error("Usuario dueño no encontrado")
  }
  const email = user.get("email") as string;

  await sendEmail(email, {
    petName: pet.get("name"),
    reporterName: name,
    reporterPhone,
    location
  });

  return report;
}
