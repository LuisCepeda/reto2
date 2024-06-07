import { createResource, getAllResources } from "@/lib/services/resources";
import { NextResponse } from "next/server";
//import { createResource, getAllResources } from '@/lib/services/resources'

export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const resources = await getAllResources(searchParams)        
        return NextResponse.json({Status:200, Data: resources },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}

export async function POST (request)  {
    try {
        const body = await request.json()
        const newResource = await createResource(body)
        
        return NextResponse.json({Status:201, Data: newResource },{status:201})
    } catch (error) {
        return NextResponse.json({Status:400,Data:null,Message:error.cause},{status:400})
    }
}
