import { NextResponse } from "next/server";
import { createResourceOnProject, getAllResourcesOnProjects } from '@/lib/services/resourcesOnProjects'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const resourcesOnProjects = await getAllResourcesOnProjects(searchParams)        
        return NextResponse.json({Status:200, Data: resourcesOnProjects },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newResourceOnProject = await createResourceOnProject(body)
        
        return NextResponse.json({Status:201, Data: newResourceOnProject },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
