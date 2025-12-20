import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

interface ReportAttributes {
  id: string;
  name: string;
  reporterPhone: string;
  location: string;
  PetId: string;
}

export class Report
  extends Model<ReportAttributes>
  implements ReportAttributes
{
  public id: string;
  public name: string;
  public reporterPhone: string;
  public location: string;
  public PetId: string;
}

Report.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    reporterPhone: DataTypes.STRING,
    location: DataTypes.STRING,
    PetId: DataTypes.UUID,
  },
  { sequelize, modelName: "Report" }
);
