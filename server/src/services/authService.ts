import * as crypto from "crypto";
import { User } from "../models";

function getSHA250ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function register(data: any) {
  const { name, email, location, password } = data;

  if (!name || !email || !password) {
    throw new Error("Falta datos obligatorios");
  }

  const hashPassword = getSHA250ofString(password);

  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      name,
      email,
      location: location || null,
      password: hashPassword,
    },
  });

  if (!created) {
    throw new Error("El usuario ya existe");
  }

  return user;
}

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email y password requeridos");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const hashPassword = getSHA250ofString(password);

  if (user.get("password") !== hashPassword) {
    throw new Error("Password incorrecto");
  }

  return user;
}

export async function changePassword(id: string, newPassword: string) {
  if (!newPassword) {
    throw new Error("Falta el ID o la newPassword");
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("El usuario no existe");
  }

  const hashPassword = getSHA250ofString(newPassword);

  await user.update({
    password: hashPassword,
  });

  return true;
}

export async function chekEmail(email: string) {
  if (!email) {
    throw new Error("Fala el email a buscar");
  }

  const user = await User.findOne({ where: { email } });

  return user;
}
