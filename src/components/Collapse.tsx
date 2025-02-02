import classConcat from '@/utils/classConcat';
import { ReactNode, useState } from 'react';
import { CaretRightFill } from 'react-bootstrap-icons';

interface collapseProps {
    title: ReactNode,
    themed?: boolean,
    showCarret?: boolean,
    className?: string,
    children?: ReactNode
}

export default function Collapse({ title, themed = true, showCarret = true, className, children }: collapseProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <details className={classConcat("flex gap-5 cursor-pointer", className || '')}>
            <summary
                onClick={handleClick}
                className={classConcat(
                    "flex gap-5 items-center transition duration-500 flex-2",
                    themed ? "text-purple-700 hover:text-pink-700" : '',
                )}
            >
                {
                    showCarret ?
                        <CaretRightFill className={`transform ${isOpen ? 'rotate-90' : ''} transition duration-500`} /> :
                        <></>
                }
                {title}
            </summary>
            <div className="pt-4">
                {children}
            </div>
        </details>
    );
}