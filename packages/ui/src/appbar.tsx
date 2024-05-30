import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export function AppBar({
    user,
    onSignin,
    onSignout
}: AppbarProps){
    return <div className="flex justify-between border-b border-slate-300 px-4 ">
        <div className="flex flex-col justify-center text-lg">
            payTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user? onSignout: onSignin}>{user? "Logout":"Login"}</Button>
        </div>
    </div>
}