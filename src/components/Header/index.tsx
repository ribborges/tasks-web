import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/Input";
import UserBadge from "@/components/UserBadge";

export default function Header() {
    const { logout, user } = useUserContext();
    
    return (
        <header className="
            flex items-center justify-between
            p-4
        ">
            <div className="flex items-center gap-4">
                <img className="w-16 h-16" src="/icon.png" alt="Tasks logo" />
                <h1 className="text-3xl font-bold text-pink-500">Tasks</h1>
            </div>
            <div className="flex items-center gap-4">
                <UserBadge user={user} />
                <Button onClick={logout}>Logout</Button>
            </div>
        </header>
    );
}