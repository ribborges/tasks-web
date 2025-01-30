import classConcat from "@/utils/classConcat";

interface UserInfoProps {
    name?: string;
    username?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function UserInfo({ name, username, size = "sm" }: UserInfoProps) {
    return (
        <div className="flex flex-col p-2 whitespace-nowrap">
            <span className={classConcat(
                "font-bold",
                size === "sm" ? "text-sm": size === "md" ? "text-base" : size === "lg" ? "text-lg" : size === "xl" ? "text-xl" : "text-2xl",
            )}>{name}</span>
            <span className={
                size === "sm" ? "text-xs": size === "md" ? "text-sm" : size === "lg" ? "text-base" : size === "xl" ? "text-lg" : "text-xl"
            }>{username}</span>
        </div>
    );
}