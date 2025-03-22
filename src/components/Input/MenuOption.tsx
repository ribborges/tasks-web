"use client";

import clsx from "clsx";
import { type ReactNode } from "react";

interface MenuButtonProps {
    hideLabelOnMobile?: boolean;
    label?: string;
    icon?: ReactNode;
    className?: string;
}

const menuOptStyle = `
    flex items-center gap-2
    p-2
    text-left
    hover:bg-zinc-400 dark:hover:bg-zinc-800
    text-zinc-900 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-200 hover:no-underline
    rounded-2xl
    transition duration-500
    cursor-pointer
`;

export function MenuButton({ hideLabelOnMobile, label, icon, className, onClick }: { onClick?: () => void } & MenuButtonProps) {
    return (
        <button
            className={clsx(menuOptStyle, className)}
            onClick={onClick}
        >
            {icon && icon}
            {label && <span className={hideLabelOnMobile ? "hidden md:block" : ""}>{label}</span>}
        </button>
    );
}

export function MenuLink({ hideLabelOnMobile, label, icon, className, href }: { href?: string } & MenuButtonProps) {
    return (
        <a
            className={clsx(menuOptStyle, className)}
            href={href}
        >
            {icon && icon}
            {label && <span className={hideLabelOnMobile ? "hidden md:block" : ""}>{label}</span>}
        </a>
    );
}