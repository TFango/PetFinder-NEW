//createPet
//getMyPets
//getNearbyPets
//markAsFound

import { Pet } from "../models";
import { client, PETS_INDEX } from "../lib/algolia";
import { uploadToCloudinary } from "./uplodadFileCloudinary";

type AlgoliaPet = {
  objectID: string;
  name: string;
  imageUrl: string;
  locationText?: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
};

export async function createPet(
  userId: string,
  data: any,
  file: Express.Multer.File
) {
  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  if (!file) throw new Error("Imagen obligatoria");

  const { name, lat, lng, locationText } = data;

  if (lat == null || lng == null) {
    throw new Error("Lat y Lng son obligatorios");
  }

  const imageUrl = await uploadToCloudinary(file.buffer);

  const pet = await Pet.create({
    name,
    imageUrl,
    lat: Number(lat),
    lng: Number(lng),
    UserId: userId,
    status: "lost",
    location: locationText,
  });

  try {
    await client.saveObject({
      indexName: PETS_INDEX,
      body: {
        objectID: pet.get("id"),
        name: pet.get("name"),
        status: pet.get("status"),
        imageUrl: pet.get("imageUrl"),
        location: pet.get("location"),
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

  const response = await client.searchSingleIndex<AlgoliaPet>({
    indexName: PETS_INDEX,
    searchParams: {
      aroundLatLng: `${lat},${lng}`,
      aroundRadius: 8000,
    },
  });

  return response.hits;
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

export async function editPet(
  userId: string,
  petId: string,
  data: any,
  file?: Express.Multer.File
) {
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

  const { name, location, lat, lng } = data;

  console.log("name de petservice:", name);

  let imageUrl;

  if (file) {
    imageUrl = await uploadToCloudinary(file.buffer);
  }

  await pet.update({
    ...(name && { name }),
    ...(lat != null && { lat: Number(lat) }),
    ...(lng != null && { lng: Number(lng) }),
    ...(location && { location }),
    ...(imageUrl && { imageUrl }),
  });

  await client.saveObject({
    indexName: PETS_INDEX,
    body: {
      objectID: pet.get("id"),
      name: pet.get("name"),
      imageUrl: pet.get("imageUrl"),
      status: pet.get("status"),
      location: pet.get("location"),
      _geoloc: {
        lat: pet.get("lat"),
        lng: pet.get("lng"),
      },
    },
  });

  return true;
}
export async function getPetById(userId: string, petId: string) {
  const pet = await Pet.findByPk(petId);

  if (!pet) throw new Error("Mascota no encontrada");
  if (pet.get("UserId") !== userId) throw new Error("No autorizado");

  return pet;
}
