import {
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
} from "../models/teamModel.js";

export const fetchTeams = async (req, res) => {
    try {
        const teams = await getTeams();
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ message: "Error fetching teams" });
    }
};

export const fetchTeamById = async (req, res) => {
    const { teamId } = req.params;

    if (!teamId) {
        return res.status(400).json({ message: "Team ID is required" });
    }

    try {
        const team = await getTeamById(teamId);
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ message: "Team not found" });
        }
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ message: "Error fetching team" });
    }
};

export const addTeam = async (req, res) => {
    const { name, description, createdDate, quantityMembers, isActive } = req.body;

    if (!name || !description || !createdDate || quantityMembers === undefined || isActive === undefined) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    try {
        const newTeam = { name, description, createdDate, quantityMembers, isActive };
        const teamId = await createTeam(newTeam);
        res.status(201).json({ message: "Team created", teamId });
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Error creating team" });
    }
};

export const updateTeamById = async (req, res) => {
    const { teamId } = req.params;
    const { name, description, createdDate, quantityMembers, isActive } = req.body;

    if (!teamId) {
        return res.status(400).json({ message: "Team ID is required" });
    }

    try {
        const updatedTeam = { name, description, createdDate, quantityMembers, isActive };
        Object.keys(updatedTeam).forEach(key => updatedTeam[key] === undefined && delete updatedTeam[key]);

        await updateTeam(teamId, updatedTeam);
        res.status(200).json({ message: "Team updated" });
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ message: "Error updating team" });
    }
};

export const deleteTeamById = async (req, res) => {
    const { teamId } = req.params;

    if (!teamId) {
        return res.status(400).json({ message: "Team ID is required" });
    }

    try {
        await deleteTeam(teamId);
        res.status(200).json({ message: "Team deleted" });
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ message: "Error deleting team" });
    }
};
