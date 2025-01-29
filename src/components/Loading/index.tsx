import { ArrowRepeat } from "react-bootstrap-icons";

export default function Spinner({ withLogo = false }: { withLogo?: boolean }) {
    return (
        <div className="absolute backdrop-blur-sm flex flex-col gap-24 justify-center items-center h-full w-full z-10">
            {withLogo && <img className="w-28 h-28" src="/icon.png" alt="Tasks logo" />}
            <div className="
                p-1
                bg-zinc-200 dark:bg-zinc-900
                border border-solid rounded-full
                border-zinc-300 dark:border-zinc-800
            ">
                <ArrowRepeat className="animate-spin text-4xl text-zinc-500" />
            </div>
        </div>
    );
}