"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function createOnrampTransaction(provider: string, amount: number){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = Math.random().toString();
    if(!userId){
        return {
            message:"unautheticated request"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            provider,
            status: "Processing",
            token: token,
            amount,
            startTime: new Date(),
            userId: Number(userId)
        }
    });

    return {
        message:"Done"
    }
}