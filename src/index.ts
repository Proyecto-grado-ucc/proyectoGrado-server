import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("🚀 Base de datos conectada con TypeORM");
        // Aquí iría tu configuración de Express
    })
    .catch((error) => console.log("❌ Error en conexión:", error));
