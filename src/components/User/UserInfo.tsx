import { UserSchema } from "@/types/user";
import classConcat from "@/utils/classConcat";

interface UserInfoProps {
    user?: UserSchema;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function UserInfo({ user, size = "sm" }: UserInfoProps) {
    return (
        <div className="flex flex-col p-2 whitespace-nowrap">
            <span className={classConcat(
                "font-bold",
                size === "sm" ? "text-sm": size === "md" ? "text-base" : size === "lg" ? "text-lg" : size === "xl" ? "text-xl" : "text-2xl",
            )}>{user?.name}</span>
            <span className={
                size === "sm" ? "text-xs": size === "md" ? "text-sm" : size === "lg" ? "text-base" : size === "xl" ? "text-lg" : "text-xl"
            }>{user?.username}</span>
        </div>
    );
}