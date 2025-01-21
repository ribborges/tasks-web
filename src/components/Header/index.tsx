import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/Input";
import { useEffect } from "react";

export default function Header() {
    const { logout, user, getUser } = useUserContext();
    
    return (
        <header className="
            flex items-center justify-between
            p-4
        ">
            <div className="flex items-center gap-4">
                <img className="w-20 h-20" src="/icon.png" alt="Tasks logo" />
                <h1 className="text-4xl font-bold text-pink-500">Tasks</h1>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <span className="font-bold">{user.name}</span>
                </div>
                <Button onClick={logout}>Logout</Button>
            </div>
        </header>
    );
}