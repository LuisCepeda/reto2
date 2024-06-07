import { NextResponse } from "next/server";
import {createUser,getAllUsers} from '@/lib/services/users'
export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const users = await getAllUsers(searchParams)        
        return NextResponse.json({Status:200, Data: users },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newUser= await createUser(body)
        
        return NextResponse.json({Status:201, Data: newUser },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
