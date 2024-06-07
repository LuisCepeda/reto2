import prisma from '@/lib/prisma'
import { formatUserQueryParams } from '../format'
import { userSchema, userUpdateSchema } from '@/schemas/schemas'

export async function getAllUsers(searchParams) {
  
    const formattedQueryParams = formatUserQueryParams(searchParams) 
    const UsersFound = await prisma.User.findMany({where:formattedQueryParams,orderBy:{createdAt:'asc'},take:20})         
    return (UsersFound)
}

export async function getUserById(id) {
    const UserFound = await prisma.user.findUnique({
        where: {
            id:id
        }
    })
    return UserFound
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