'use server'


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

export async function getMatchingRoleUsers(roles) {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}