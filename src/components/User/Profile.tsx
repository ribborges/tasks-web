import { Spacer } from "@/components/Separator";
import { useUserStore } from "@/lib/store";
import EditUser from "@/components/forms/EditUser";
import EditPassword from "@/components/forms/EditPassword";

import { ProfilePic, UserInfo } from "./";

export default function Profile() {
    const { user } = useUserStore();

    return (
        <div className="flex flex-1 flex-col justify-between gap-4 p-8">
            <div className="flex items-center gap-4">
                <ProfilePic className="h-24 w-24" src={user?.profilePic} alt={user?.username} />
                <UserInfo size="2xl" name={user?.name} username={user?.username} />
            </div>
            <Spacer space={0} />
            <EditUser />
            <Spacer space={0} />
            <EditPassword />
        </div>
    );
}