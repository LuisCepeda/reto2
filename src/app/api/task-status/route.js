import {  getAllTaskStatus } from "@/lib/services/taskStatus";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const searchParams = new URLSearchParams("?" + request?.url.split("?").slice(-1)[0])
        
        const taskStatus = await getAllTaskStatus()        
        return NextResponse.json({Status:200, Data: taskStatus },{status:200})
    } catch (error) {
        return NextResponse.json({Status:500,Data:null,Message:error})
    }
}