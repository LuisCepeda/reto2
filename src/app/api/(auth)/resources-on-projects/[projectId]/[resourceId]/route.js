import { deleteResourceOnProjectById, getResourceOnProjectById, updateResourceOnProjectById } from "@/lib/services/resourcesOnProjects"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { projectId,resourceId } = params    
        const resourceOnProject = await getResourceOnProjectById(parseInt(projectId),parseInt(resourceId))        
        return NextResponse.json({Status:200, Data: resourceOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { projectId,resourceId } = params  
        const body = await request.json()
        const updatedResourceOnProject = await updateResourceOnProjectById(parseInt(projectId),parseInt(resourceId), body)
        return NextResponse.json({Status:200, Data: updatedResourceOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { projectId,resourceId } = params   
        const deletedResourceOnProject = await deleteResourceOnProjectById(parseInt(projectId),parseInt(resourceId))
        return NextResponse.json({Status:204, Data: deletedResourceOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}
