import { Button } from "@/components/Input";
import UserBadge from "@/components/UserBadge";
import useUserStore from "@/lib/store/user.store";

export default function Header() {
    const { logout, user } = useUserStore();

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
                {user && <UserBadge user={user} />}
                <Button onClick={logout}>Logout</Button>
            </div>
        </header>
    );
}