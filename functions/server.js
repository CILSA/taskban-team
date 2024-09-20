import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import {
    fetchTeams,
    fetchTeamById,
    addTeam,
    updateTeamById,
    deleteTeamById
} from "./controllers/teamController.js";

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Rutas de equipos
router.get("/teams", fetchTeams); // Obtener todos los equipos
router.post("/teams", addTeam); // Crear un nuevo equipo
router.get("/teams/:teamId", fetchTeamById); // Obtener un equipo por ID
router.put("/teams/:teamId", updateTeamById); // Actualizar un equipo por ID
router.delete("/teams/:teamId", deleteTeamById); // Eliminar un equipo por ID

// Registrar las rutas de equipos
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
