"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function p2pTransfers(to: string, amount: number){
    const session = await getServerSession(authOptions);
    const fromUser = session.user.id;

    if(!fromUser){
        return{
            message:"unautheticated request"
        }
    }

    const toUser = await prisma.user.findUnique({
        where:{
            number: to
        }
    });

    if(!toUser){
        return{
            message:"User not found"
        }
    }
    await prisma.$transaction(async (tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where:{
                userId: Number(fromUser)
            }
        });

        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(fromUser) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data:{
                amount,
                timestamp: new Date(),
                fromUserId: Number(fromUser),
                toUserId: toUser.id
            }
          })
    })
}

