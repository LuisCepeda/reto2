'use client'
import { createContext, useState, useEffect, useContext } from 'react';
import { getProjectLeaderRoleId,getSystemRoles,getTeamRoles } from '@/actions/team-actions';


const TeamDataContext = createContext();
export const TeamDataProvider = ({ children }) => {
    const [teamRoles, setTeamRoles] = useState([])
    const [systemRoles, setSystemRolesData] = useState([])
    const [leaderRoleId, setLeaderRoleId] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamRolesData = await getTeamRoles()
                const systemRolesData = await getSystemRoles()
                const leader = await getProjectLeaderRoleId()
                
                setLeaderRoleId(leader.Data[0].id)
                setTeamRoles(teamRolesData.Data)
                setSystemRolesData(systemRolesData.Data)
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, []);

    return (
        <TeamDataContext.Provider value={{ teamRoles,systemRoles,leaderRoleId}}>
            {children}
        </TeamDataContext.Provider>
    )
}

export const useTeamData = () => useContext(TeamDataContext);
