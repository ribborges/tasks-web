'use client';

import { ReactNode, useState } from 'react';
import { CaretRightFill } from 'react-bootstrap-icons';
import { clsx } from 'clsx';

interface collapseProps {
    title: ReactNode,
    showCaret?: boolean,
    themed?: boolean,
    className?: string,
    children?: ReactNode
}

export default function Collapse({ title, showCaret = true, themed = true, className, children }: collapseProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <details className={clsx("flex gap-5 cursor-pointer", className || '')}>
            <summary
                onClick={handleClick}
                className={clsx(
                    "flex gap-4 items-center transition duration-500 flex-2 font-bold",
                    themed ? "text-indigo-500 hover:text-indigo-800" : '',
                )}
            >
                {
                    showCaret ?
                        <CaretRightFill className={`transform ${isOpen ? 'rotate-90' : ''} transition duration-500`} /> :
                        <></>
                }
                {title}
            </summary>
            <div className="pt-4 flex flex-col">
                {children}
            </div>
        </details>
    );
}