import prisma from '@/lib/prisma'
import { formatUserQueryParams } from '../format'
import { userSchema, userUpdateSchema } from '@/schemas/schemas'

export async function getAllUsers(searchParams) {
  
    const formattedQueryParams = formatUserQueryParams(searchParams) 
    const usersFound = await prisma.user.findMany({where:formattedQueryParams,orderBy:{createdAt:'asc'},include:{systemRoles:true}})       
    return (usersFound)
}

export async function getUserById(id) {
    const userFound = await prisma.user.findUnique({
        where: {
            id:id
        }
    })
    return userFound
}

export async function getUserByEmail(email) {
    const userFound = await prisma.user.findUnique({
        where: {
            email:email
        }
    })
    return userFound
}

export async function createUser(UserData) {
    const validateBody = userSchema.safeParse(UserData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad user body",{cause:errors})
    }
    const data = validateBody.data

    const newUser = await prisma.user.create({ data })   
    return (newUser)
}

export async function updateUserById(id,UserData) {
    const validateBody = userUpdateSchema.safeParse(UserData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad user body",{cause:errors})
    }
    const data = validateBody.data
    const updatedUser = await prisma.user.update({
        where: {
            id:id
        },
        data
    })
    return updatedUser
}

export async function deleteUserById(id) {
    const deletedUser = await prisma.user.delete({ where: { id: id } })
    return deletedUser
}