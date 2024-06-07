
import { NextResponse } from "next/server";
import { createEcosystem, getAllEcosystems } from '@/lib/services/ecosystems'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const ecosystems = await getAllEcosystems(searchParams)        
        return NextResponse.json({Status:200, Data: ecosystems },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newEcosystem= await createEcosystem(body)
        return NextResponse.json({Status:201, Data: newEcosystem },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
