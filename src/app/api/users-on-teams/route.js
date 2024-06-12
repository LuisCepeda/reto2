import { NextResponse } from "next/server";
import { createUserOnTeam, getAllUsersOnTeams } from '@/lib/services/usersOnTeams'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const usersOnTeams = await getAllUsersOnTeams(searchParams)        
        return NextResponse.json({Status:200, Data: usersOnTeams },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newUserOnTeam = await createUserOnTeam(body)
        
        return NextResponse.json({Status:201, Data: newUserOnTeam },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
