import { NextResponse } from "next/server";
import { getAllSystemRolesOnUsers,createRoleOnUser } from '@/lib/services/systemRolesOnUsers'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const rolesOnUsers = await getAllSystemRolesOnUsers(searchParams)        
        return NextResponse.json({Status:200, Data: rolesOnUsers },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST(request) {
    try {
        const body = await request.json()        

        const newSystemRoleOnUser = await createRoleOnUser(body)
        
        return NextResponse.json({Status:201, Data: newSystemRoleOnUser },{status:201})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:JSON.stringify(error)})
    }
}