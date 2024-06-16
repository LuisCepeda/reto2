import { NextResponse } from "next/server";
import { getAllTeamRoles } from '@/lib/services/teamRoles'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const roles = await getAllTeamRoles(searchParams)        
        return NextResponse.json({Status:200, Data: roles },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}