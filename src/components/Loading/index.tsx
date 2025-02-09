import { ArrowRepeat } from "react-bootstrap-icons";

function Loading() {
    return (
        <div className="flex flex-col gap-24 justify-center items-center bg-white dark:bg-black h-screen w-screen z-[2]">
            <img className="w-28 h-28" src="/icon.png" alt="Tasks logo" />
            <Spinner />
        </div>
    );
}

function Spinner() {
    return (
        <div className="
            p-1
            bg-zinc-200 dark:bg-zinc-900
            border border-solid rounded-full
            border-zinc-300 dark:border-zinc-800
        ">
            <ArrowRepeat className="animate-spin text-4xl text-zinc-500" />
        </div>
    );
}

export { Loading, Spinner };