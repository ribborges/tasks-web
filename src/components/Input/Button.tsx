import { ReactNode } from "react";
import { clsx } from 'clsx';

interface ButtonProps {
    autofocus?: boolean,
    disabled?: boolean,
    id?: string,
    name?: string
    value?: string,
    className?: string,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    children?: ReactNode,
}

function Button({ type = "button", autofocus, disabled, id, name, value, onClick, children, className }: ButtonProps) {
    return (
        <button
            className={clsx(`
                text-zinc-800 dark:text-zinc-200 disabled:text-zinc-500/40
                bg-transparent hover:bg-indigo-600 focus:bg-indigo-600
                disabled:bg-transparent
                hover:shadow-2xl focus:shadow-2xl
                hover:shadow-zinc-950/20 focus:shadow-zinc-950/20
                dark:hover:shadow-zinc-200/20 dark:focus:shadow-zinc-200/20
                disabled:hover:shadow-none disabled:focus:shadow-none
                flex basis-[max-content] items-center justify-center content-center gap-2
                p-2 lg:p-4 m-1
                text-sm lg:text-base
                rounded-xl border border-solid
                border-indigo-600 disabled:border-zinc-500/40
                transition duration-500
                select-none
            `, className || "")}
            type={type}
            id={id}
            name={name}
            value={value}
            autoFocus={autofocus}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export { Button };