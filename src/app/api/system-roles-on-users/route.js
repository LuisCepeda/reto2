import { NextResponse } from "next/server";
import { getAllSystemRolesOnUsers } from '@/lib/services/systemRolesOnUsers'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const rolesOnUsers = await getAllSystemRolesOnUsers(searchParams)        
        return NextResponse.json({Status:200, Data: rolesOnUsers },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}