import { NextResponse } from "next/server";
import { createTask, getAllTasks } from '@/lib/services/tasks'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const tasks = await getAllTasks(searchParams)        
        return NextResponse.json({Status:200, Data: tasks },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newTask = await createTask(body)
        
        return NextResponse.json({Status:201, Data: newTask },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
