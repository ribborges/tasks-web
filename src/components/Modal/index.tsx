'use client';

import { ReactNode } from 'react';
import { XLg } from "react-bootstrap-icons";

import { Spacer } from '@/components/Separator';

interface ModalProps {
    closeBtn: () => void,
    title?: string,
    children?: ReactNode,
}

export default function Modal(props: ModalProps) {
    return (
        <div className="
            absolute
            flex box-border
            z-[99]
            w-screen h-screen
            overflow-hidden
            backdrop-blur-sm
        ">
            <div className="
                flex flex-col box-border
                m-auto p-5
                w-10/12 md:w-8/12 lg:w-6/12
                rounded-xl border border-solid border-zinc-300 dark:border-zinc-800
                bg-zinc-200 dark:bg-zinc-900
                shadow-2xl shadow-black/20 dark:shadow-zinc-200/20
            ">
                <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold">{props.title}</span>
                    <button onClick={props.closeBtn} className="p-1 m-1 rounded-full hover:bg-red-600 transition duration-500">
                        <XLg />
                    </button>
                </div>
                <Spacer space={30} />
                <div className="flex-1 relative">
                    {props.children}
                </div>
            </div>
        </div>
    );
}