import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
    measurementId: process.env.VITE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener todos los equipos
export const getTeams = async () => {
    try {
        const teamsCollection = collection(db, 'teams');
        const teamsSnapshot = await getDocs(teamsCollection);
        return teamsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
};

// Obtener un equipo por ID
export const getTeamById = async (teamId) => {
    try {
        const teamRef = doc(db, 'teams', teamId);
        const teamSnapshot = await getDoc(teamRef);
        return teamSnapshot.exists() ? { id: teamSnapshot.id, ...teamSnapshot.data() } : null;
    } catch (error) {
        console.error("Error fetching team:", error);
        throw error;
    }
};

// Crear un nuevo equipo
export const createTeam = async (team) => {
    try {
        const teamsCollection = collection(db, 'teams');
        const docRef = await addDoc(teamsCollection, team);
        return docRef.id;
    } catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
};

// Actualizar un equipo existente
export const updateTeam = async (teamId, updatedTeam) => {
    try {
        const teamRef = doc(db, 'teams', teamId);
        await updateDoc(teamRef, updatedTeam);
    } catch (error) {
        console.error("Error updating team:", error);
        throw error;
    }
};

// Eliminar un equipo
export const deleteTeam = async (teamId) => {
    try {
        const teamRef = doc(db, 'teams', teamId);
        await deleteDoc(teamRef);
    } catch (error) {
        console.error("Error deleting team:", error);
        throw error;
    }
};
