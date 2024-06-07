
import { deleteProjectById, getProjectById, updateProjectById } from "@/lib/services/projects"
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {

        const { id } = params    
        const project = await getProjectById(parseInt(id))        
        return NextResponse.json({Status:200, Data: project },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}


export async function PATCH(request,{params}) {
    try {
        const { id } = params  
        const body = await request.json()
        const updatedProject=await updateProjectById(parseInt(id),body)
        return NextResponse.json({Status:200, Data: updatedProject },{status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request,{params}){
    try {
        const { id } = params  
        const deletedProject = await deleteProjectById(parseInt(id))
        return NextResponse.json({Status:204, Data: deletedProject },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error.message})
    }
}