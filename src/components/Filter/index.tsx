import { useState, ReactNode } from "react";
import clsx from "clsx";

interface FilterButtonProps {
    id?: string,
    active?: boolean,
    icon?: ReactNode,
    label: string,
    onClick: () => void
}

interface FilterContainerProps {
    id: string,
    items: Array<{
        icon?: ReactNode,
        label: string,
        content: ReactNode
    }>
}

export function FilterButton(props: FilterButtonProps) {
    return (
        <button
            className={clsx(
                `
                    p-3
                    flex items-center gap-2
                    border border-solid rounded-full
                    hover:opacity-50
                    transition duration-500
                `,
                props.active ? "border-indigo-600 bg-indigo-600/50" : "first-line:border-zinc-200 dark:border-zinc-800"
            )}
            onClick={props.onClick}
        >
            {props.icon && <span className="text-zinc-700 dark:text-zinc-300">{props.icon}</span>}
            {props.label && <span className="text-zinc-700 dark:text-zinc-300">{props.label}</span>}
        </button>
    );
}

export function Filter(props: FilterContainerProps) {
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col gap-4 overflow-hidden">
            <div className="flex gap-2 overflow-auto">
                {props.items.map((item, index) => {
                    return (
                        <FilterButton
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            onClick={() => setActive(index)}
                            active={active === index}
                        />
                    )
                })}
            </div>
            <div className="flex flex-col gap-2 overflow-auto">
                {props.items[active].content}
            </div>
        </div>
    );
}