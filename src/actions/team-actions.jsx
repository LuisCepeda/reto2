'use server'
import { joinQueryParams } from "@/lib/format"
import { makeHttpRequest } from '@/lib/utils'


export async function getSystemRoles() {
    const res = await makeHttpRequest('system-roles', 'GET')
    if (res.Status === 200) return res
}

export async function getProjectLeaderRoleId() {
    const queryParams = 'role-name=Líder de Proyecto'
    const url = `team-roles/?${queryParams}`
    const res = await makeHttpRequest(url, 'GET')
    if (res.Status === 200) return res
}


export async function getTeamRoles() {
    const res = await makeHttpRequest('team-roles', 'GET')
    if (res.Status === 200) return res
}

export async function getMatchingRoleUsers(roles) {
    const queryParams = joinQueryParams(roles, 'role')
    const url = `system-roles-on-users/?${queryParams}`

    const res = await makeHttpRequest(url, 'GET')
    if (res.Status === 200) return res
}


export async function createTeam(teamData) {
    const { selectedTeamRoles, ...teamProperties } = teamData
    const statusId = teamProperties.isTeamActive ? 1 : 2
    const teamBody = {
        name: teamProperties.teamName,
        description: teamProperties.teamDescription,
        systemStatusId: statusId
    }
    const teamResponse = await makeHttpRequest('teams', 'POST', teamBody)

    if (!teamResponse.Status === 201) throw new Error(`HTTP error! status: ${teamResponse.status}`)
    const teamId = teamResponse.Data.id
    const responses = [];
    for (const [memberId, roleId] of Object.entries(selectedTeamRoles)) {
        const response = await makeHttpRequest('users-on-teams', 'POST', {
            userId: parseInt(memberId),
            teamId: parseInt(teamId),
            teamRoleId: parseInt(roleId)
        })

        responses.push(response);
    }

    return responses
}