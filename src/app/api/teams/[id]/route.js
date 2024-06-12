import { deleteTeamById, getTeamById, updateTeamById } from "@/lib/services/teams"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params    
        const team = await getTeamById(parseInt(id))        
        return NextResponse.json({Status:200, Data: team }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = params  
        const body = await request.json()
        const updatedTeam = await updateTeamById(parseInt(id), body)
        return NextResponse.json({Status:200, Data: updatedTeam }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params  
        const deletedTeam = await deleteTeamById(parseInt(id))
        return NextResponse.json({Status:204, Data: deletedTeam }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}
