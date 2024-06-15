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