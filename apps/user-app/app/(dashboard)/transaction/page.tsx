import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { SendTransactions } from "../../../components/SendTransaction";
import { Center } from "@repo/ui/center";

async function getP2pTransaction(){
    const session = await getServerSession(authOptions);
    const tnxs = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId: Number(session?.user?.id)
        }
    });

    return tnxs.map((x)=>({
        time: x.timestamp,
        amount: x.amount,
        status:"Success",
        provider:""
    }))
}
export default async function() {
    const transactions = await getP2pTransaction();

    return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 w-screen">
        <Center>
            <SendCard /> 
        </Center>
        <div className="flex flex-col justify-center">
            <SendTransactions transactions={transactions}/>
        </div>
    </div>
}