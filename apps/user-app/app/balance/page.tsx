"use client"

import {useBalance} from "@repo/store/useBalance"

export default function(){
    const balance = useBalance();
    return <h1 className="text-xl">{balance}</h1>
}