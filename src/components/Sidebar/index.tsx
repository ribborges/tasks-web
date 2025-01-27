'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ThreeDots, Calendar2Fill, GearFill, PlusLg, StarFill, UiChecksGrid, Collection } from 'react-bootstrap-icons';
import { Spacer } from '../Separator';
import classConcat from '@/utils/classConcat';

export default function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const router = useRouter();

    return (
        <>
            <nav className="
				flex flex-col items-center content-center justify-between
				backdrop-blur-md bg-zinc-100 dark:bg-zinc-950 bg-opacity-50 dark:bg-opacity-50
				top-0 p-4 m-2
				border border-b-2 border-solid border-zinc-400 dark:border-zinc-800 border-opacity-40 dark:border-opacity-40 rounded-2xl
				shadow-xl
				select-none
			">
                <div className="hidden lg:flex lg:flex-col flex-1 items-center content-between justify-between gap-5">
                    <NavItemContainer>
                        <NavItem onclick={() => router.push('/')} icon={<UiChecksGrid />} />
                        <NavItem onclick={() => router.push('/')} icon={<Calendar2Fill />} />
                        <NavItem onclick={() => router.push('/')} icon={<StarFill />} />
                        <NavItem onclick={() => router.push('/')} icon={<PlusLg />} />
                        <Spacer height={10} />
                        <NavItem className='text-red-600' onclick={() => router.push('/')} icon={<Collection />} />
                        <NavItem className='text-blue-600' onclick={() => router.push('/')} icon={<Collection />} />
                        <NavItem className='text-yellow-600' onclick={() => router.push('/')} icon={<Collection />} />
                        <NavItem className='text-green-600' onclick={() => router.push('/')} icon={<Collection />} />
                        <Spacer height={10} />
                    </NavItemContainer>
                    <NavItem onclick={() => router.push('/')} icon={<GearFill />} />
                </div>
                <div className="flex flex-col lg:hidden">
                    <NavButton onClick={toggleMenu} icon={
                        isMenuOpen ? <X /> : <ThreeDots />
                    } />
                </div>
            </nav>
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <NavItemContainer>
                            <NavItem onclick={() => router.push('/')} icon={<UiChecksGrid />} />
                            <NavItem onclick={() => router.push('/')} icon={<Calendar2Fill />} />
                            <NavItem onclick={() => router.push('/')} icon={<StarFill />} />
                            <NavItem onclick={() => router.push('/')} icon={<PlusLg />} />
                            <Spacer height={10} />
                            <NavItem className='text-red-600' onclick={() => router.push('/')} icon={<Collection />} />
                            <NavItem className='text-blue-600' onclick={() => router.push('/')} icon={<Collection />} />
                            <NavItem className='text-yellow-600' onclick={() => router.push('/')} icon={<Collection />} />
                            <NavItem className='text-green-600' onclick={() => router.push('/')} icon={<Collection />} />
                            <Spacer height={10} />
                        </NavItemContainer>
                        <NavItem onclick={() => router.push('/')} icon={<GearFill />} />
                    </div>
                </div>
            )}
        </>
    );
}

export function NavItemContainer(props: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center content-center gap-5">
            {props.children}
        </div>
    );
}

export function NavItem(props: { icon: any, onclick?: () => void, className?: string }) {
    return (
        <button onClick={props.onclick} className={classConcat(
            props.className || "",
            `
                flex items-center content-center gap-4
                text-xl
                p-3
                hover:bg-zinc-400 dark:hover:bg-zinc-800
                hover:no-underline
                border border-solid border-transparent rounded-2xl hover:border-zinc-500 dark:hover:border-zinc-700
                transition duration-500
                cursor-pointer
            `
        )}>
            {props.icon}
        </button>
    );
}

export function NavButton(props: { label?: string, icon: any, onClick?: () => void }) {
    return (
        <button className="
			flex items-center content-center gap-2
			text-xl
			p-2
			hover:bg-zinc-400 dark:hover:bg-zinc-800
			text-zinc-900 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-200 hover:no-underline
			border border-solid border-transparent rounded-2xl hover:border-zinc-500 dark:hover:border-zinc-700
			transition duration-500
			cursor-pointer
		"
            onClick={props.onClick}>
            {props.icon}
            {
                props.label ?
                    <i className="text-zinc-900 dark:text-zinc-200 not-italic text-lg">{props.label}</i>
                    :
                    <></>
            }
        </button>
    );
}