import UserBadge from "@/components/UserBadge";
import useUserStore from "@/lib/store/user.store";

export default function Header() {
    const { user } = useUserStore();

    return (
        <header className="
            flex items-center justify-between
            p-4
        ">
            <div className="flex items-center gap-4">
                <img className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" src="/icon.png" alt="Tasks logo" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-500">Tasks</h1>
            </div>
            <div className="flex items-center gap-4">
                {user && <UserBadge user={user} />}
            </div>
        </header>
    );
}