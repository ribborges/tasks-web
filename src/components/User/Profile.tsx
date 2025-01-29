import { Envelope, Key, Person, PersonBadge } from "react-bootstrap-icons";

import { Spacer } from "@/components/Separator";
import { Button, Input } from "@/components/Input";
import { useUserStore } from "@/lib/store";
import { ProfilePic, UserInfo } from "./";

export default function Profile() {
    const { user } = useUserStore();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <ProfilePic className="h-24 w-24" user={user} />
                <UserInfo size="2xl" user={user} />
            </div>
            <Spacer space={0} />
            <form className="flex flex-col gap-2">
                <Input icon={<Person />} label="Name" value={user?.name} type="text" />
                <Input icon={<PersonBadge />} label="Username" value={user?.username} type="text" />
                <Input icon={<Envelope />} label="Email" value={user?.email} type="email" />
                <div className="flex justify-end">
                    <Button type="submit">Save</Button>
                </div>
            </form>
            <Spacer space={0} />
            <form className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Input icon={<Key />} label="Old password" type="password" />
                    <Input icon={<Key />} label="New password" type="password" />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Change password</Button>
                </div>
            </form>
        </div>
    );
}