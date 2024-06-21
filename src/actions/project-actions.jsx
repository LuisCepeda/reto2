'use server'

import { makeHttpRequest } from "@/lib/utils"


export async function createProject(formData) {
    try {
        const { data, projectDuration, selectedTeam, tasks } = formData;

        const projectBody = {
            name: data.projectName,
            description: data.projectDescription,
            progress: 0,
            projectStatusId: 1,
            ecosystemId: 1,
            startDate: projectDuration.start,
            endDate: projectDuration.end
        };


        const projectResponse = await makeHttpRequest('projects', 'POST', projectBody);

        if (!projectResponse || !projectResponse.Data || !projectResponse.Data.id) {
            console.error('Error en la respuesta de creación de proyecto:', projectResponse);
            throw new Error('Error al crear el proyecto');
        }
        const projectId = projectResponse.Data.id;

        const tasksResponses = await Promise.all(tasks.map(async (task) => {
            const taskResponse = await makeHttpRequest('tasks', 'POST', {
                name: task.name,
                description: task.description,
                projectStatusId: parseInt(task.status),
                priorityId: parseInt(task.priority)
            });

            if (!taskResponse || !taskResponse.Data || !taskResponse.Data.id) {
                console.error('Error en la respuesta de creación de tarea:', taskResponse);
                throw new Error('Error al crear una tarea');
            }
            return taskResponse;
        }));

        const teamOnProjectResponse = await makeHttpRequest('teams-on-projects', 'POST', { projectId: parseInt(projectId), teamId: parseInt(selectedTeam) });

        if (!teamOnProjectResponse) {
            console.error('Error en la respuesta de asociación del equipo al proyecto:', teamOnProjectResponse);
            throw new Error('Error al asociar el equipo al proyecto');
        }


        const tasksId = tasksResponses.map(task => task.Data.id);
        const tasksOnProjectResponses = await Promise.all(tasksId.map(async (id) => {
            const taskOnProjectResponse = await makeHttpRequest('tasks-on-projects', 'POST', {
                taskId: parseInt(id),
                projectId: parseInt(projectId),
            });
            if (!taskOnProjectResponse) {
                console.error('Error en la respuesta de asociación de tarea al proyecto:', taskOnProjectResponse);
                throw new Error('Error al asociar una tarea al proyecto');
            }
            return taskOnProjectResponse;
        }));

        return [
            projectResponse,
            ...tasksResponses,
            ...tasksOnProjectResponses,
            teamOnProjectResponse
        ];
    } catch (error) {
        console.error("Error creando el proyecto", error);
        throw new Error("Error creando el proyecto", { cause: error });
    }
}




export async function getTeams() {
    const res = await makeHttpRequest('teams/?activo=true', 'GET')
    if (res.Status === 200) return res.Data
}


export async function getPriorities() {
    const res = await makeHttpRequest('priorities', 'GET')
    if (res.Status === 200) return res.Data
}
export async function getTaskStatus() {
    const res = await makeHttpRequest('task-status', 'GET')
    if (res.Status === 200) return res.Data
}
export async function getResources() {
    const res = await makeHttpRequest('resources', 'GET')
    if (res.Status === 200) return res.Data
}

