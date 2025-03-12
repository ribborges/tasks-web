import { BoxArrowRight, Gear, Person } from "react-bootstrap-icons";

import Dropdown from "@/components/Dropdown";
import { useUserStore } from "@/lib/store";
import useModal from '@/hooks/useModal';
import { Profile, ProfilePic, Settings, UserInfo } from "@/components/User";

export default function UserBadge() {
    const { user } = useUserStore();
    const { logout } = useUserStore();

    const { show } = useModal();

    const profileModal = () => {
        show({
            title: 'Profile',
            content: <Profile />
        });
    }

    const settingsModal = () => {
        show({
            title: 'Settings',
            content: <Settings />
        });
    }

    return (
        <Dropdown
            align="right"
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
                    type: "button",
                    icon: <Person />,
                    label: "Profile",
                    onClick: profileModal
                },
                {
                    type: "button",
                    icon: <Gear />,
                    label: "Settings",
                    onClick: settingsModal
                },
                {
                    type: "button",
                    icon: <BoxArrowRight />,
                    label: "Logout",
                    onClick: logout
                }
            ]}
            title={
                <div className="flex gap-2 m-1">
                    <ProfilePic className="h-16 w-16" src={user?.profilePic} alt={user?.username} loading={!user} />
                    <UserInfo name={user?.name} username={user?.username} />
                </div>
            }
        >
            <ProfilePic src={user?.profilePic} alt={user?.username} loading={!user} />
        </Dropdown>
    );
}