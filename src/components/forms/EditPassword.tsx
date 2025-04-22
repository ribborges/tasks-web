import { useActionState, useEffect, useState } from "react";
import { Key } from "react-bootstrap-icons";

import { Spinner } from "@/components/Loading";
import { Button, Input } from "@/components/Input";
import { useUserStore } from "@/lib/store";
import { handleInputChange } from "@/utils/handleInputChange";
import { editPassword } from "@/actions/user.actions";
import Validation from "../Validation";

export default function EditPassword() {
    const { user } = useUserStore();

    const [state, action, pending] = useActionState(editPassword, undefined);

    const [password, setPassword] = useState({
        password: "",
        newPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setPassword);

    useEffect(() => {
        if (state === true && user) {
            setPassword({
                password: "",
                newPassword: ""
            });
        }
    }, [state]);

    return (
        <form action={action} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input type="hidden" name="userId" value={user?.id} />
                <Input
                    id="password"
                    value={password.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    label="Old password"
                    icon={<Key />}
                    placeholder="••••••••"
                />
                <Validation error={state?.errors?.password} />
                <Input
                    id="newPassword"
                    value={password.newPassword}
                    onChange={handleChange}
                    type="password"
                    name="newPassword"
                    label="New password"
                    icon={<Key />}
                    placeholder="••••••••"
                />
                <Validation error={state?.errors?.newPassword} />
            </div>
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={
                        pending ||
                        password.password === "" ||
                        password.newPassword === ""
                    }
                >
                    {pending ? <Spinner size={24} /> : "Change password"}
                </Button>
            </div>
        </form>
    );
}