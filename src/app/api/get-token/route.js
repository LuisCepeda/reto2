import { getServerSession } from 'next-auth/next'
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const session = await getServerSession()       



        if (!session) {
            throw  new Error( {name:'Unauthorized',message:'No hay sesión activa.'} );
        }

        return NextResponse.json({Status:200, Data: session },{status:200})
    } catch (error) {
        console.error( JSON.stringify(error))
        return NextResponse.json({Status:400,Data:null,Message:JSON.stringify(error)},{status:400})
    }
}