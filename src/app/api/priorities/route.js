import { getAllPriorities } from "@/lib/services/priorities";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const priorities = await getAllPriorities()        
        return NextResponse.json({Status:200, Data: priorities },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}