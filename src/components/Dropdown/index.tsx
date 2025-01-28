import classConcat from "@/utils/classConcat";
import { ReactNode, useState } from "react";
import { CaretDownFill } from "react-bootstrap-icons";

interface dropdownProps {
    button: ReactNode,
    items: dropdownItemProps[],
    className?: string,
    disabled?: boolean,
}

interface dropdownItemProps {
    icon: ReactNode,
    title: string,
    action?: () => void,
}

export default function Dropdown(props: dropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 cursor-pointer"
            >
                <div className={props.className}>
                    {props.button}
                </div>
                <div>
                    <CaretDownFill size={16} className={classConcat(isOpen ? "rotate-180" : "", "transition duration-500")} />
                </div>
            </button>
            {isOpen && (
                <div className="absolute top-20">
                    <ul className="flex flex-col items-stretch justify-stretch gap-1 shadow-2xl shadow-black/10 dark:shadow-white/10 rounded-xl p-1 border border-solid border-zinc-700 bg-zinc-800">
                        {props.items.map((item, index) => (
                            <DropdownItem key={index} icon={item.icon} title={item.title} action={item.action} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function DropdownItem(props: dropdownItemProps) {
    return (
        <li onClick={props.action} className="relative flex gap-2 p-2 hover:bg-zinc-500/50 cursor-pointer rounded-lg transition duration-500">
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