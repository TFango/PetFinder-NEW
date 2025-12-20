import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  location?: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public location!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    location: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);
