'use client'
import { createContext, useState, useEffect, useContext } from 'react';
import { getTaskStatus, getPriorities,getTeams } from '@/actions/project-actions';

const TaskDataContext = createContext();
export const TaskDataProvider = ({ children }) => {
    const [priorities, setPriorities] = useState([])
    const [taskStatus, setTaskStatus] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prioritiesData = await getPriorities();
                const statusesData = await getTaskStatus();
                const teams = await getTeams()
                setTeams(teams)
                setPriorities(prioritiesData);
                setTaskStatus(statusesData);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, []);

    return (
        <TaskDataContext.Provider value={{ priorities, taskStatus ,teams}}>
            {children}
        </TaskDataContext.Provider>
    )
}

export const useTaskData = () => useContext(TaskDataContext);
