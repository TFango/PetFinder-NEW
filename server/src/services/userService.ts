//getMe
//updateMe

import { User } from "../models";

export async function getMe(id: string) {
  if (!id) {
    throw new Error("Falta el id");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return {
    id: user.get("id"),
    name: user.get("name"),
    location: user.get("location"),
  };
}

export async function updateMe(
  id: string,
  newName?: string,
  newLocation?: string
) {
  if (!id) {
    throw new Error("Faltan el id");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  await user.update({
    ...(newName && { name: newName }),
    ...(newLocation && { location: newLocation }),
  });

  return {
    id: user.get("id"),
    name: user.get("name"),
    email: user.get("email"),
    location: user.get("location"),
  };
}
