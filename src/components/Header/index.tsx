'use client';

import UserBadge from "@/components/UserBadge";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4">
                <img className="w-10 h-10" src="/icon.png" alt="Tasks logo" />
                <h1 className="text-xl font-bold text-pink-500">Tasks</h1>
            </div>
            <div className="flex items-center gap-4">
                <UserBadge />
            </div>
        </header>
    );
}