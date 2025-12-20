import { sequelize } from "../models";

async function syncDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB sincronizada correctamente");
    process.exit(0);
  } catch (err) {
    console.error("Error al sincronizar DB", err);
    process.exit(1);
  }
}

syncDB();
