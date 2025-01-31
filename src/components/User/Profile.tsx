import { useState } from "react";
import { Envelope, Key, Person, PersonBadge } from "react-bootstrap-icons";

import { Spacer } from "@/components/Separator";
import { Button, Input } from "@/components/Input";
import { useUserStore } from "@/lib/store";
import { ProfilePic, UserInfo } from "./";
import handleInputChange from "@/utils/handleInputChange";
import Loading from "@/components/Loading";
import { ChangePassword, UpdateUser } from "@/services/user.service";

export default function Profile() {
    const { user, setUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: user?.name,
        username: user?.username,
        email: user?.email
    });
    const [password, setPassword] = useState({
        password: "",
        newPassword: ""
    });

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setUserData);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setPassword);

    const handleUserSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (user?.id) {
            await UpdateUser(user?.id, userData)
                .then((res) => {
                    if (!res) {
                        console.error('Error updating user: no response');
                        return;
                    }

                    if (res?.status !== 200) {
                        console.error('Error updating user:', res.status);
                        return;
                    }

                    setIsLoading(false);
                    setUser({
                        ...user,
                        name: userData?.name || user?.name,
                        username: userData?.username || user?.username,
                        email: userData?.email || user?.email
                    });
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (user?.id) {
            await ChangePassword(user?.id, password)
                .then((res) => {
                    if (!res) {
                        console.error('Error updating password: no response');
                        return;
                    }

                    if (res?.status !== 200) {
                        console.error('Error updating password:', res.status);
                        return;
                    }

                    setPassword({
                        password: "",
                        newPassword: ""
                    });
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }
    }

    return (
        <>
            {isLoading ? <div className="absolute z-[2]"><Loading /></div> : <></>}
            <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <ProfilePic className="h-24 w-24" src={user?.profilePic} alt={user?.username} loading={false} />
                    <UserInfo size="2xl" name={userData.name} username={userData.username} />
                </div>
                <Spacer space={0} />
                <form className="flex flex-col gap-2">
                    <Input
                        id="name"
                        value={userData?.name}
                        onChange={handleUserChange}
                        type="text"
                        name="name"
                        label="Name"
                        icon={<Person />}
                    />
                    <Input
                        id="username"
                        value={userData?.username}
                        onChange={handleUserChange}
                        type="text"
                        name="username"
                        label="Username"
                        icon={<PersonBadge />}
                    />
                    <Input
                        id="email"
                        value={userData?.email}
                        onChange={handleUserChange}
                        type="email"
                        name="email"
                        label="Email"
                        icon={<Envelope />}
                    />
                    <div className="flex justify-end">
                        <Button disabled={
                            userData.name === user?.name &&
                            userData.username === user?.username &&
                            userData.email === user?.email
                        } type="button" onClick={handleUserSubmit}>
                            Save
                        </Button>
                    </div>
                </form>
                <Spacer space={0} />
                <form className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Input
                            id="password"
                            value={password.password}
                            onChange={handlePasswordChange}
                            type="password"
                            name="password"
                            label="Old password"
                            icon={<Key />}
                            placeholder="••••••••"
                        />
                        <Input
                            id="newPassword"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                            type="password"
                            name="newPassword"
                            label="New password"
                            icon={<Key />}
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button disabled={
                            password.password === "" || password.newPassword === ""
                        } type="button" onClick={handlePasswordSubmit}>
                            Change password
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}