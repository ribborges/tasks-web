'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ItemContainerProps {
    className?: string;
    children?: ReactNode;
}

export default function Navbar(props: ItemContainerProps) {
    return (
        <>
            <nav className={clsx(`
                absolute lg:static z-10 lg:h-auto bottom-0 right-0 left-0
                backdrop-blur-xs lg:backdrop-blur-none
				flex lg:flex-col items-center content-center justify-between
				bg-zinc-100/40 dark:bg-zinc-950/40
				p-2 m-2
				border border-b-2 border-solid rounded-full lg:rounded-4xl
                border-zinc-400/40 dark:border-zinc-800/40
				shadow-xl
				select-none
			`, props.className)}>
                <div className="flex lg:flex-col flex-1 items-center content-between gap-5">
                    <NavItemContainer className='justify-between flex-1 lg:flex-none'>
                        {props.children}
                    </NavItemContainer>
                </div>
            </nav>
        </>
    );
}

export function NavItemContainer(props: { className?: string, children: ReactNode }) {
    return (
        <div className={clsx(
            "flex flex-row lg:flex-col gap-2",
            props.className || ''
        )}>
            {props.children}
        </div>
    );
}