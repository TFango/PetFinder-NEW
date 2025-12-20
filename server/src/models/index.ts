import { sequelize } from "./sequelize";
import { Pet } from "./pet.model";
import { Report } from "./report.model";
import { User } from "./user.model";

User.hasMany(Pet);
Pet.belongsTo(User);

Pet.hasMany(Report);
Report.belongsTo(Pet);

export { sequelize, User, Pet, Report };
