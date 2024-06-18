
import { NextResponse } from "next/server";
import { createProject, getAllProjects } from '@/lib/services/projects'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const projects = await getAllProjects(searchParams)        
        return NextResponse.json({Status:200, Data: projects },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST(request) {
    try {
        const body = await request.json()    
        const newProject= await createProject(body)
        
        return NextResponse.json({Status:201, Data: newProject },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
