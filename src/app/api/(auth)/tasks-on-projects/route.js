import { NextResponse } from "next/server";
import { createTaskOnProject, getAllTasksOnProjects } from '@/lib/services/tasksOnProjects'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const tasksOnProjects = await getAllTasksOnProjects(searchParams)        
        return NextResponse.json({Status:200, Data: tasksOnProjects },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newTaskOnProject = await createTaskOnProject(body)
        
        return NextResponse.json({Status:201, Data: newTaskOnProject },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
