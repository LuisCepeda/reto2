import { NextResponse } from "next/server";
import { getAllRoles } from '@/lib/services/roles'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const roles = await getAllRoles()        
        return NextResponse.json({Status:200, Data: roles },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}