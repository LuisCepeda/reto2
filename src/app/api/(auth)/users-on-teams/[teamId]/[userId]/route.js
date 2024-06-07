import { deleteUserOnTeamById, getUserOnTeamById, updateUserOnTeamById } from "@/lib/services/usersOnTeams"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { teamId,userId } = params   
        const userOnTeam = await getUserOnTeamById(parseInt(teamId),parseInt(userId))        
        return NextResponse.json({Status:200, Data: userOnTeam }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error})
    }
}

export async function PATCH(request, { params }) {
    try {
        const { teamId,userId } = params  
        const body = await request.json()
        const updatedUserOnTeam = await updateUserOnTeamById(parseInt(teamId),parseInt(userId), body)
        return NextResponse.json({Status:200, Data: updatedUserOnTeam }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request, { params }) {
    try {
        const { teamId,userId } = params   
        const deletedUserOnTeam = await deleteUserOnTeamById(parseInt(teamId),parseInt(userId))
        return NextResponse.json({Status:204, Data: deletedUserOnTeam }, {status:200})
    } catch (error) {
        return NextResponse.json({Status:500, Data:null, Message:error.message})
    }
}

