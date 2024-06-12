import { deleteResourceById, getResourceById, updateResourceById } from "@/lib/services/resources"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params    
        const resource = await getResourceById(parseInt(id))        
        return NextResponse.json({Status:200, Data: resource }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = params  
        const body = await request.json()
        const updatedResource = await updateResourceById(parseInt(id), body)
        return NextResponse.json({Status:200, Data: updatedResource }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params  
        const deletedResource = await deleteResourceById(parseInt(id))
        return NextResponse.json({Status:204, Data: deletedResource }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}
