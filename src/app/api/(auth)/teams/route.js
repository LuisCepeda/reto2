import { NextResponse } from "next/server";
import { createTeam, getAllTeams } from '@/lib/services/teams'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const teams = await getAllTeams(searchParams)        
        return NextResponse.json({Status:200, Data: teams },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newTeam = await createTeam(body)
        
        return NextResponse.json({Status:201, Data: newTeam },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
