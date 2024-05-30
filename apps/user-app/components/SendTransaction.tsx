import { Card } from "@repo/ui/card"

export const SendTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8 text-2xl">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between gap-10 pt-6">
                <div>
                    <div className="text-lg">
                        {`Sent INR(${t.status})`}
                    </div>
                    <div className="text-slate-600 text-md">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center text-lg">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}