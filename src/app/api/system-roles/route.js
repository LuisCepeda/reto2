import { NextResponse } from "next/server";
import { getAllSystemRoles } from '@/lib/services/systemRoles'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const roles = await getAllSystemRoles()        
        return NextResponse.json({Status:200, Data: roles },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}