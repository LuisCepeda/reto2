import prisma from '@/lib/prisma'
import { formatTeamRolesQueryParams } from '../format'

export async function getAllTeamRoles(searchParams) {
    const formattedQueryParams = formatTeamRolesQueryParams(searchParams) 
    const rolesFound = await prisma.teamRole.findMany({where:formattedQueryParams})         
    return rolesFound
}

