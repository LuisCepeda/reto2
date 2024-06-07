import { deleteTaskById, getTaskById, updateTaskById } from "@/lib/services/tasks"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params    
        const task = await getTaskById(parseInt(id))        
        return NextResponse.json({Status:200, Data: task }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = params  
        const body = await request.json()
        const updatedTask = await updateTaskById(parseInt(id), body)
        return NextResponse.json({Status:200, Data: updatedTask }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params  
        const deletedTask = await deleteTaskById(parseInt(id))
        return NextResponse.json({Status:204, Data: deletedTask }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
