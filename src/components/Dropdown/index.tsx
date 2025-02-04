'use client';

import { ReactNode, useState } from "react";
import { CaretDownFill } from "react-bootstrap-icons";
import { clsx } from 'clsx';

import { Spacer } from "@/components/Separator";

interface DropdownProps {
    align: 'left' | 'right' | 'center',
    showCaret?: boolean,
    button: ReactNode,
    items: DropdownItemProps[],
    className?: string,
    disabled?: boolean,
    children?: ReactNode,
}

interface DropdownItemProps {
    icon: ReactNode,
    title: string,
    action?: () => void,
}

export default function Dropdown({ align = 'center', showCaret = true, ...props }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 cursor-pointer"
            >
                <div className={props.className}>
                    {props.button}
                </div>
                {showCaret && (
                    <div>
                        <CaretDownFill size={16} className={clsx(isOpen ? "rotate-180" : "", "transition duration-500")} />
                    </div>
                )}
            </button>
            {isOpen && (
                <div className={clsx(
                    "absolute top-full mt-2 w-fit min-w-full z-[5]",
                    align === 'left' ? " left-full transform -translate-x-full" : "",
                    align === 'right' ? " right-full transform translate-x-full" : "",
                    align === 'center' ? " left-1/2 transform -translate-x-1/2" : ""
                )}>
                    <div className="
                        p-1
                        flex flex-col items-stretch justify-stretch gap-1
                        shadow-2xl shadow-black/10 dark:shadow-white/10
                        border border-solid rounded-xl
                        border-zinc-300 bg-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-800/50
                        backdrop-blur-sm
                    ">
                        {props.children &&
                            <>
                                {props.children}
                                <Spacer vertical space={5} />
                            </>
                        }
                        <ul className="flex flex-col items-stretch justify-stretch gap-1">
                            {props.items.map((item, index) => (
                                <DropdownItem key={index} icon={item.icon} title={item.title} action={item.action} />
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

function DropdownItem(props: DropdownItemProps) {
    return (
        <li onClick={props.action} className="flex gap-2 p-2 hover:bg-zinc-500/50 cursor-pointer rounded-lg transition duration-500 whitespace-nowrap">
            <button
                className="flex items-center gap-2 text-left"
                onClick={() => {
                    props.action?.();
                }}
                type="button"
            >
                <div>{props.icon}</div>
                <div>{props.title}</div>
            </button>
        </li>
    );
}