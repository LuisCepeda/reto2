import { deleteTeamOnProjectById, getTeamOnProjectById, updateTeamOnProjectById } from "@/lib/services/teamsOnProjects"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { projectId,teamId } = params   
        const teamOnProject = await getTeamOnProjectById(parseInt(projectId),parseInt(teamId))        
        return NextResponse.json({Status:200, Data: teamOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { projectId,teamId } = params    
        const body = await request.json()
        const updatedTeamOnProject = await updateTeamOnProjectById(parseInt(projectId),parseInt(teamId), body)
        return NextResponse.json({Status:200, Data: updatedTeamOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { projectId,teamId } = params  
        const deletedTeamOnProject = await deleteTeamOnProjectById(parseInt(projectId),parseInt(teamId))
        return NextResponse.json({Status:204, Data: deletedTeamOnProject }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}
