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
                    action: profileModal
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
            button={<ProfilePic user={user} />}
        >
            <div className="flex gap-2 m-1">
                <ProfilePic className="h-16 w-16" user={user} />
                <UserInfo user={user} />
            </div>
        </Dropdown>
    );
}