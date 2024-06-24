'use client'
import { getProjects } from '@/actions/project-actions';
import { createContext, useState, useEffect, useContext } from 'react';

const ProjectDataContext = createContext();

export const ProjectDataProvider = ({ children }) => {
   
    const [projects,setProjects]=useState([])
    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const projectsData = await getProjects()
                setProjects(projectsData)
            } catch (error) {
                console.log('error', error);
            }
        }

        fetchProjectsData()
    }, [])
    


    return (
        <ProjectDataContext.Provider value={{projects}}>
            {children}
        </ProjectDataContext.Provider>
    )
}

export const useProjectData = () => useContext(ProjectDataContext);