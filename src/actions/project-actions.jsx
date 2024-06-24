'use server'

import { makeHttpRequest } from "@/lib/utils"
import { progress } from "framer-motion";


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


export async function updateProjectsTask(data) {
    try {
        console.log('data', data)
        const transformedTasks = Object.entries(data).map(([taskId, isSelected]) => {
            return {
                [parseInt(taskId)]: {
                    projectStatusId: isSelected ? 3 : 2,
                },
            };
        });


        const promises = (transformedTasks.map(taskObj => {
            const taskId = Object.keys(taskObj)[0]
            const { projectStatusId } = taskObj[taskId]
            return makeHttpRequest(`tasks/${taskId}`, 'PATCH', { projectStatusId })
        }))

        const results = await Promise.all(promises);
        console.log('results', results)
        return results
    } catch (error) {
        console.error("Error actualizando las tareas:", error);

    }
}

export async function updateProjectProgress(id) {
    try {
        const tasks = await makeHttpRequest(`tasks-on-projects/?projectId=${id}`, 'GET')

        const totalTasks = tasks.Data.length;
        const completedTasks = tasks.Data.filter(item => item.task.projectStatusId === 3).length;
        const percentage = (completedTasks / totalTasks) * 100

        const progressUpdated = await makeHttpRequest(`projects/${id}`, 'PATCH', { progress: percentage })
        console.log('progressUpdated', progressUpdated)
        return progressUpdated
    } catch (error) {
        console.error("Error actualizando el progreso:", error);
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

export async function getProjects() {
    const res = await makeHttpRequest('projects', 'GET')
    if (res.Status === 200) return res.Data
}