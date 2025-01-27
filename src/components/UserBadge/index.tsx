import { PersonFill } from "react-bootstrap-icons";

import { UserSchema } from "@/types/user";

export default function UserBadge({ user }: { user: UserSchema }) {
    return (
        <div className="
            flex items-center
            gap-2
            text-sm
            hover:opacity-60
            transition duration-500
        ">
            <div className="
                w-12 h-12
                flex items-center justify-center
                overflow-hidden
                border-2 border-solid rounded-full
                bg-zinc-300 dark:bg-zinc-800
                border-zinc-400 dark:border-zinc-700
            ">
                {
                    user.profilePic
                        ? <img
                            className="w-12 h-12 rounded-full"
                            src={user.profilePic}
                            alt={user.username}
                        />
                        : <PersonFill className="w-8 h-8" />
                }
            </div>
            <div className="flex flex-col">
                <span className="font-bold">{user.name}</span>
                <span>{user.username}</span>
            </div>
        </div>
    );
}