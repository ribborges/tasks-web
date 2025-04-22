import { useActionState, useEffect, useState } from "react";
import { Person, PersonBadge, Envelope } from "react-bootstrap-icons";

import { Spinner } from "@/components/Loading";
import { Button, Input } from "@/components/Input";
import { handleInputChange } from "@/utils/handleInputChange";
import { useUserStore } from "@/lib/store";
import { editUser } from "@/actions/user.actions";
import Validation from "@/components/Validation";

export default function EditUser() {
    const { user, setUser } = useUserStore();

    const [state, action, pending] = useActionState(editUser, undefined);

    const [userData, setUserData] = useState({
        name: user?.name,
        username: user?.username,
        email: user?.email
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setUserData);

    useEffect(() => {
        if (state === true && user) {
            setUser({
                ...user,
                name: userData?.name || user?.name,
                username: userData?.username || user?.username,
                email: userData?.email || user?.email
            });
            setUserData({
                name: user?.name,
                username: user?.username,
                email: user?.email
            });
        }
    }, [state]);

    return (
        <form action={action} className="flex flex-col gap-2">
            <input type="hidden" name="userId" value={user?.id} />
            <Input
                id="name"
                value={userData?.name}
                onChange={handleChange}
                type="text"
                name="name"
                label="Name"
                icon={<Person />}
            />
            <Validation error={state?.errors?.name} />
            <Input
                id="username"
                value={userData?.username}
                onChange={handleChange}
                type="text"
                name="username"
                label="Username"
                icon={<PersonBadge />}
            />
            <Validation error={state?.errors?.username} />
            <Input
                id="email"
                value={userData?.email}
                onChange={handleChange}
                type="email"
                name="email"
                label="Email"
                icon={<Envelope />}
            />
            <Validation error={state?.errors?.email} />
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={
                        pending ||
                        userData.name === user?.name &&
                        userData.username === user?.username &&
                        userData.email === user?.email
                    }
                >
                    {pending ? <Spinner size={24} /> : "Save"}
                </Button>
            </div>
        </form>
    );
}