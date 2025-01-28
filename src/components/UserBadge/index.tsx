import { BoxArrowRight, Gear, Person, PersonFill } from "react-bootstrap-icons";

import { UserSchema } from "@/types/user";
import Dropdown from "@/components/Dropdown";
import { useUserStore } from "@/lib/store";

export default function UserBadge({ user }: { user: UserSchema }) {
    const { logout } = useUserStore();
    
    return (
        <Dropdown
            className="
                flex items-center
                gap-2
                flex-nowrap
                text-xs lg:text-sm
                hover:opacity-60
                transition duration-500
            "
            items={[
                {
                    icon: <Person />,
                    title: "Profile",
                    action: () => { }
                },
                {
                    icon: <Gear />,
                    title: "Settings",
                    action: () => { }
                },
                {
                    icon: <BoxArrowRight />,
                    title: "Logout",
                    action: logout
                }
            ]}
            button={<>
                <div className="
                        w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
                        flex items-center justify-center
                        overflow-hidden
                        border-2 border-solid rounded-full
                        bg-zinc-300 dark:bg-zinc-800
                        border-zinc-400 dark:border-zinc-700
                    ">
                    {
                        user.profilePic
                            ? <img
                                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full"
                                src={user.profilePic}
                                alt={user.username}
                            />
                            : <PersonFill className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                    }
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">{user.name}</span>
                    <span>{user.username}</span>
                </div>
            </>}
        >

        </Dropdown>
    );
}