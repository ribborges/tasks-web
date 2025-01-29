import { BoxArrowRight, Gear, Person, PersonFill } from "react-bootstrap-icons";

import Dropdown from "@/components/Dropdown";
import { useUserStore } from "@/lib/store";
import useModal from '@/hooks/useModal';
import Loading from "@/components/Loading";

export default function UserBadge() {
    const { user } = useUserStore();
    const { logout } = useUserStore();

    const { show } = useModal();

    const settingsModal = () => {
        show({
            title: 'Settings',
            content: <div>Content</div>
        });
    }

    return (
        <Dropdown
            align="left"
            showCaret={false}
            disabled={!user}
            className="
                flex items-center
                gap-2
                flex-nowrap
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
                    action: settingsModal
                },
                {
                    icon: <BoxArrowRight />,
                    title: "Logout",
                    action: logout
                }
            ]}
            button={<>
                <div className="
                        w-10 h-10
                        flex items-center justify-center
                        overflow-hidden
                        border-2 border-solid rounded-full
                        bg-zinc-300 dark:bg-zinc-800
                        border-zinc-400 dark:border-zinc-700
                    ">
                    {
                        user ?
                            user?.profilePic ?
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={user.profilePic}
                                    alt={user.username}
                                /> :
                                <PersonFill className="w-6 h-6 text-zinc-500" /> :
                            <Loading />
                    }
                </div>
            </>}
        >
            <div className="flex gap-2 m-1">
                <div className="
                        w-12 h-12
                        flex items-center justify-center
                        overflow-hidden
                        border-2 border-solid rounded-full
                        bg-zinc-300 dark:bg-zinc-800
                        border-zinc-400 dark:border-zinc-700
                    ">
                    {
                        user?.profilePic
                            ? <img
                                className="w-12 h-12 rounded-full"
                                src={user.profilePic}
                                alt={user.username}
                            />
                            : <PersonFill className="w-8 h-8" />
                    }
                </div>
                <div className="flex flex-col p-2 whitespace-nowrap">
                    <span className="font-bold text-sm">{user?.name}</span>
                    <span className="text-xs">{user?.username}</span>
                </div>
            </div>
        </Dropdown>
    );
}