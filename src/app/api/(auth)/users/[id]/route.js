import { deleteUserById, getUserById, updateUserById } from "@/lib/services/users";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {

        const { id } = params    
        const user = await getUserById(parseInt(id))        
        return NextResponse.json({Status:200, Data: user },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}


export async function PATCH(request,{params}) {
    try {
        const { id } = params  
        const body = await request.json()
        const updatedUser=await updateUserById(parseInt(id),body)
        return NextResponse.json({Status:200, Data: updatedUser },{status:200})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}

export async function DELETE(request,{params}){
    try {
        const { id } = params  
        const deletedUser = await deleteUserById(parseInt(id))
        return NextResponse.json({Status:204, Data: deletedUser },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error.message})
    }
}