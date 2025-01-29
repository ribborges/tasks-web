'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ThreeDots, Calendar2Fill, StarFill, Collection, CollectionFill, HouseFill, PlusSquareFill } from 'react-bootstrap-icons';

import { Spacer } from '@/components/Separator';
import classConcat from '@/utils/classConcat';
import useModal from '@/hooks/useModal';

export default function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const { show } = useModal();

    const addModal = () => {
        show({
            title: 'Create Task',
            content: <div>Content</div>
        });
    }

    const router = useRouter();

    return (
        <>
            <nav className="
                absolute lg:static z-10 h-12 lg:h-auto top-[90%]
                backdrop-blur-sm lg:backdrop-blur-none
				flex lg:flex-col items-center content-center justify-between
				bg-zinc-100/40 dark:bg-zinc-950/40
				p-2 m-2
				border border-b-2 border-solid rounded-full lg:rounded-2xl
                border-zinc-400/40 dark:border-zinc-800/40
				shadow-xl
				select-none
			">
                <div className="flex lg:flex-col flex-1 items-center content-between gap-5">
                    <NavItemContainer className='justify-between flex-1 lg:flex-none'>
                        <NavItem onClick={() => router.push('/')} icon={<HouseFill />} label='Tasks' />
                        <NavItem onClick={() => router.push('/')} icon={<Calendar2Fill />} label='Calendar' />
                        <NavItem onClick={() => router.push('/')} icon={<StarFill />} label='Important' />
                        <NavItem onClick={addModal} icon={<PlusSquareFill />} label='Add' />
                        <NavItem className='lg:hidden' onClick={toggleMenu} icon={<CollectionFill />} label='Categories' />
                    </NavItemContainer>
                    <Spacer space={5} className='hidden lg:block' />
                    <NavItemContainer className="hidden lg:flex">
                        <NavItem className='text-red-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                        <NavItem className='text-blue-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                        <NavItem className='text-yellow-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                        <NavItem className='text-green-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                    </NavItemContainer>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="lg:hidden fixed z-40 backdrop-blur-md">
                    <div className="flex items-center p-2">
                        <NavItem onClick={toggleMenu} icon={
                            isMenuOpen ? <X /> : <ThreeDots />
                        } />
                    </div>
                    <Spacer space={10} />
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <NavItemContainer className='flex-col'>
                            <NavItem className='text-red-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                            <NavItem className='text-blue-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                            <NavItem className='text-yellow-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                            <NavItem className='text-green-600' onClick={() => router.push('/')} icon={<Collection />} label='Category' />
                        </NavItemContainer>
                    </div>
                </div>
            )}
        </>
    );
}

export function NavItemContainer(props: { className?: string, children: ReactNode }) {
    return (
        <div className={classConcat(
            "flex flex-row lg:flex-col gap-2",
            props.className || ''
        )}>
            {props.children}
        </div>
    );
}

export function NavItem(props: { icon: any, onClick?: () => void, className?: string, label?: string }) {
    return (
        <button type='button' onClick={props.onClick} className={classConcat(
            `
                flex flex-col items-center content-center gap-1 flex-1
                p-2 lg:p-3
                hover:bg-zinc-400 dark:hover:bg-zinc-800
                hover:no-underline
                border border-solid border-transparent rounded-2xl hover:border-zinc-500 dark:hover:border-zinc-700
                transition duration-500
                cursor-pointer
            `, props.className || ""
        )}>
            {props.icon ? <div className="text-base md:text-lg lg:text-xl">{props.icon}</div> : <></>}
            {props.label ? <i className="text-zinc-900 dark:text-zinc-200 not-italic text-[0.6rem]">{props.label}</i> : <></>}
        </button>
    );
}