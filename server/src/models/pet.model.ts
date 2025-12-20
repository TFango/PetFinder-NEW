import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export type PetStatus = "lost" | "found";

interface PetAttributes {
  id: string;
  name: string;
  status: PetStatus;
  location?: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  UserId: string;
}

export class Pet extends Model<PetAttributes> implements PetAttributes {
  public id!: string;
  public name!: string;
  public status!: PetStatus;
  public location?: string;
  public lat!: number;
  public lng!: number;
  public imageUrl?: string;
  public UserId!: string;
}

Pet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    status: DataTypes.ENUM("lost", "found"),
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.UUID,
  },
  {
    sequelize,
    modelName: "Pet",
  }
);
