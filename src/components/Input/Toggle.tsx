'use client';

import { ReactNode, useState } from "react";

import classConcat from "@/utils/classConcat";

interface toggleButtonProps {
    id?: string,
    active?: boolean,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: ReactNode;
}

interface toggleContainerProps {
    id: string,
    items: Array<{
        label: string,
        content: ReactNode
    }>,
    itemsAlign?: "center" | "start" | "end" | "stretch" | "baseline",
}

function ToggleButton(props: toggleButtonProps) {
    return (
        <button
            id={props.id}
            onClick={props.onClick}
            className={
                classConcat(
                    props.className || '',
                    "inline-block p-2 rounded-lg",
                    "after:content-[\"\"] after:block after:mt-2 after:w-full after:h-1 after:rounded-lg after:transiton after:duration-500",
                    props.active ? "after:bg-pink-700" : "after:bg-transparent",
                    "hover:after:bg-violet-700",
                    "select-none"
                )
            }
        >
            <span className="p-1">{props.children}</span>
        </button>
    );
}

export default function Toggle(props: toggleContainerProps) {
    const [active, setActive] = useState(0);

    return (
        <div id={props.id} className="flex-1 flex flex-col items-center gap-2 overflow-hidden">
            <div className="flex max-w-full overflow-x-scroll whitespace-nowrap select-none">
                {
                    props.items?.map((value, index) => (
                        <ToggleButton
                            key={index}
                            id={props.id + "_btn" + index}
                            onClick={() => setActive(index)}
                            active={active === index}
                        >{value.label}</ToggleButton>
                    ))
                }
            </div>
            {
                props.items[active].content
            }
        </div>
    );
}