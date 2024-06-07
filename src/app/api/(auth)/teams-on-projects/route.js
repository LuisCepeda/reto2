import { NextResponse } from "next/server";
import { createTeamOnProject, getAllTeamsOnProjects } from '@/lib/services/teamsOnProjects'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const teamsOnProjects = await getAllTeamsOnProjects(searchParams)        
        return NextResponse.json({Status:200, Data: teamsOnProjects },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newTeamOnProject = await createTeamOnProject(body)
        
        return NextResponse.json({Status:201, Data: newTeamOnProject },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})

    }
}
