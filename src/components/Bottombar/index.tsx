'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ItemContainerProps {
    className?: string;
    children?: ReactNode;
}

export default function Bottombar(props: ItemContainerProps) {
    return (
        <>
            <nav className={clsx(`
                absolute z-10 bottom-0 self-center
                backdrop-blur-sm
				flex items-center content-center gap-5
				bg-zinc-100/40 dark:bg-zinc-950/40
				p-3 m-2
				border border-b-2 border-solid rounded-full lg:rounded-4xl
                border-zinc-400/40 dark:border-zinc-800/40
				shadow-xl
				select-none
			`, props.className)}>
                {props.children}
            </nav>
        </>
    );
}

export { Bottombar };
