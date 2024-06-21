'use server'
import { makeHttpRequest } from "@/lib/utils"


export async function createUser(userData) {
    try {
        console.log('1');
        const res = await makeHttpRequest('users', 'POST', userData)
        if (res.Status !== 201) throw new Error('Fallo en la solicitud. Error registrando usuario.')


        const responseSystemRoleOnUser = await assignSystemRoleToUser(res.Data.id, 2)
        if (responseSystemRoleOnUser.Status !== 201) {
            throw new Error('Fallo en la solicitud. Error asignando rol.')
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function checkUserByEmail(email) {
    try {
        const res = await makeHttpRequest(`users?email=${email}`, 'GET')
        const json = await res.json()

        if (json.Status !== 200) throw new Error('Fallo en la solicitud.')

        if (json.Data.length === 1) return true
        return false
    } catch (error) {
        console.error(error)
    }
}

export async function assignSystemRoleToUser(userId, systemRoleId) {
    try {
        const userRolPair = { userId: userId, systemRoleId: systemRoleId }
        const res = await makeHttpRequest('system-roles-on-users', 'POST', userRolPair)
        if (res.Status !== 201) throw new Error('Fallo en la solicitud. No se pudo asignar un rol.')

        return res
    } catch (error) {
        console.error(error)
    }
}


