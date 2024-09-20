import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Configura Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCx8GI5km0guJojFuOb9KDKNSclqFQBhLI",
    authDomain: "taskban-v1.firebaseapp.com",
    projectId: "taskban-v1",
    storageBucket: "taskban-v1.appspot.com",
    messagingSenderId: "774075443466",
    appId: "1:774075443466:web:0b1ccf90595264ef8872f3",
    measurementId: "G-1MCX6F9W86"
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
