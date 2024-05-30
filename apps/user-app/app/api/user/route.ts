import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions);
    if(session){
        return NextResponse.json({
            user: session.user
        })
    }

    return  NextResponse.json({
        message:"You are not logged in"
    },{
        status: 403
    })
}