import { deleteTaskOnProjectById, getTaskOnProjectById, updateTaskOnProjectById } from "@/lib/services/tasksOnProjects"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { projectId,taskId } = params     
        const taskOnProject = await getTaskOnProjectById(parseInt(projectId),parseInt(taskId))        
        return NextResponse.json({Status:200, Data: taskOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { projectId,taskId } = params   
        const body = await request.json()
        const updatedTaskOnProject = await updateTaskOnProjectById(parseInt(projectId),parseInt(taskId), body)
        return NextResponse.json({Status:200, Data: updatedTaskOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { projectId,taskId } = params   
        const deletedTaskOnProject = await deleteTaskOnProjectById(parseInt(projectId),parseInt(taskId))
        return NextResponse.json({Status:204, Data: deletedTaskOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}
