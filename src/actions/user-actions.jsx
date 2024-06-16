'use server'


export async function createUser(userData) {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return res.ok
}