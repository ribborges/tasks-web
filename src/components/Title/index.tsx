import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
    return (
        <div className="p-4 border-b border-solid border-b-zinc-500/20">
            <h2 className="flex items-center gap-6">{children}</h2>
        </div>
    );
}