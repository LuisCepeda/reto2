'use server'

import { joinQueryParams } from "@/lib/format"


export async function getSystemRoles() {
    const res = await fetch(`${process.env.BASE_URL}/api/system-roles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    if (res.ok) return res.json()
}

export async function getProjectLeaderRoleId() {
    const queryParams = 'role-name=Lider de Proyecto'
    const url = `${process.env.BASE_URL}/api/team-roles/?${queryParams}`

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) return res.json()
}


export async function getTeamRoles() {
    const res = await fetch(`${process.env.BASE_URL}/api/team-roles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    if (res.ok) return res.json()
}

export async function getMatchingRoleUsers(roles) {
    const queryParams = joinQueryParams(roles, 'role')
    const url = `${process.env.BASE_URL}/api/system-roles-on-users/?${queryParams}`

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) return res.json()
}

async function makeHttpRequest(value) {
    const url = `${process.env.BASE_URL}/api/users-on-teams`
    const { userId, teamId, teamRoleId } = value

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                teamId,
                teamRoleId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json()

    } catch (error) {
        console.error('Request failed', error);
    }
}


export async function createTeam(teamData) {
    const { selectedTeamRoles, ...teamProperties } = teamData
    const statusId = teamProperties.isTeamActive ? 1 : 2

    const teamResponse = await fetch(`${process.env.BASE_URL}/api/teams`, {
        method: 'POST',
        body: JSON.stringify({
            name: teamProperties.teamName,
            description: teamProperties.teamDescription,
            systemStatusId: statusId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )

    if (!teamResponse.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const team = await teamResponse.json()
    const responses = [];
    for (const [memberId, roleId] of Object.entries(selectedTeamRoles)) {
        const response = await makeHttpRequest({
            userId: parseInt(memberId),
            teamId: parseInt(team.Data.id),
            teamRoleId: parseInt(roleId)
        })
        responses.push(response);
    }

    return responses
}