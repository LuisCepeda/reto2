
import { deleteEcosystemById, getEcosystemById, updateEcosystemById } from "@/lib/services/ecosystems"
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {

        const { id } = params    
        const ecosystem = await getEcosystemById(parseInt(id))        
        return NextResponse.json({Status:200, Data: ecosystem },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}


export async function PATCH(request,{params}) {
    try {
        const { id } = params  
        const body = await request.json()
        const updatedEcosystem=await updateEcosystemById(parseInt(id),body)
        return NextResponse.json({Status:200, Data: updatedEcosystem },{status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request,{params}){
    try {
        const { id } = params  
        const deletedEcosystem = await deleteEcosystemById(parseInt(id))
        return NextResponse.json({Status:204, Data: deletedEcosystem },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error.message})
    }
}