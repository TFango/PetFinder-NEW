//createPet
//getMyPets
//getNearbyPets
//markAsFound

import { Pet } from "../models";
import { client, PETS_INDEX } from "../lib/algolia";

export async function createPet(userId: string, data: any) {
  console.log("DATA:", data);
  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { lat, lng } = data;

  if (lat == null || lng == null) {
    throw new Error("Lat y Lng son obligatorios");
  }

  const pet = await Pet.create({
    ...data,
    UserId: userId,
    status: "lost",
  });

  try {
    await client.saveObject({
      indexName: PETS_INDEX,
      body: {
        objectID: pet.get("id"),
        name: pet.get("name"),
        status: pet.get("status"),
        imageUrl: pet.get("imageUrl"),
        _geoloc: {
          lat: Number(lat),
          lng: Number(lng),
        },
      },
    });
  } catch (err) {
    console.error("Error indexando en Algolia", err);
  }

  return pet;
}

export async function getMyPets(userId: string) {
  if (!userId) {
    throw new Error("Usuario no autentiado");
  }

  const pets = await Pet.findAll({
    where: {
      UserId: userId,
    },
  });

  return pets;
}

export async function getNearbyPets(lat: number, lng: number) {
  if (!lat || !lng) {
    throw new Error("Es necesario lat y lng");
  }

  const { results } = await client.search({
    requests: [
      {
        indexName: PETS_INDEX,
        aroundLatLng: `${lat},${lng}`,
        aroundRadius: 10000,
      },
    ],
  });

  return results;
}

export async function markAsFound(userId: string, petId: string) {
  console.log(userId);

  if (!userId || !petId) {
    throw new Error("Datos incompletos");
  }

  const pet = await Pet.findByPk(petId);

  if (!pet) {
    throw new Error("Mascota no encontrada");
  }

  if (pet.get("UserId") != userId) {
    throw new Error("No autorizado");
  }

  await pet.update({
    status: "found",
  });

  try {
    await client.deleteObject({
      indexName: PETS_INDEX,
      objectID: pet.get("id"),
    });
  } catch (err) {
    console.error("Error borrando de Algolia", err);
  }

  return true;
}

export async function editPet(userId: string, petId: string, data: any) {
  if (!userId || !petId) {
    throw new Error("Datos incompletos");
  }

  const pet = await Pet.findByPk(petId);
  if (!pet) {
    throw new Error("Mascota no encontrada");
  }

  if (pet.get("UserId") !== userId) {
    throw new Error("No autorizado");
  }

  const { name, imageUrl, location, lat, lng } = data;

  await pet.update({
    ...(name && { name }),
    ...(imageUrl && { imageUrl }),
    ...(location && { location }),
    ...(lat != null && { lat }),
    ...(lng != null && { lng }),
  });

  const algoliaObject: any = {
    objectID: pet.get("id"),
    name: pet.get("name"),
    status: pet.get("status"),
    ...(pet.get("imageUrl") && { imageUrl: pet.get("imageUrl") }),
  };

  if (pet.get("lat") != null && pet.get("lng") != null) {
    algoliaObject._geoloc = {
      lat: pet.get("lat"),
      lng: pet.get("lng"),
    };
  }

  try {
    await client.saveObject({
      indexName: PETS_INDEX,
      body: algoliaObject,
    });
  } catch (err) {
    console.error("Error actualizando Algolia", err);
  }

  return true;
}
